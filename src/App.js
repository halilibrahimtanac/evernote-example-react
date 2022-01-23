import React from 'react';
import './App.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import SidebarComponent from './sidebar/sidebar'
import EditorComponent from './editor/editor'

class App extends React.Component{

  constructor(){
    super()
    this.state = {
      selectedNoteIndex : null,
      selectedNote: null,
      notes: null
    }
  }
  render(){
    return(
    <div className='app-container'>
      <SidebarComponent 
      selectedNoteIndex={this.state.selectedNoteIndex}
      notes={this.state.notes}
      selectNote={this.selectNote}
      deleteNote={this.deleteNote}
      newNote={this.newNote}></SidebarComponent>
      {
        this.state.selectedNote ? 
        <EditorComponent 
        selectedNoteIndex={this.state.selectedNoteIndex}
        selectedNote={this.state.selectedNote}
        updateNote={this.updateNote}></EditorComponent>: null
      }
      
      </div>)
  }

  componentDidMount = () => {
    firebase.firestore().collection('notes').onSnapshot(server => {
      const notes = server.docs.map(_doc => {
        const data = _doc.data()
        data['id'] = _doc.id
        return data
      })
      console.log(notes)
      this.setState({notes: notes})
    })
    
  } 
  selectNote = (note,index) => {
    this.setState({selectedNoteIndex: index, selectedNote: note})
  }
  updateNote = (id,noteObj) => {
    firebase.firestore().collection('notes').doc(id).update({
      title: noteObj.title,
      body: noteObj.body,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
  }
  newNote = async (title) => {
    const note = {
      title: title,
      body: ''
    }
    const newFromFB = await firebase.firestore().collection('notes').add({
      title : note.title,
      body: note.body,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    const newID = newFromFB.id
    console.log(this.state.notes)
    const newIndex = this.state.notes.indexOf(this.state.notes.filter(n => n.id === newID)[0])
    this.setState({selectedNote : this.state.notes[newIndex], selectedNoteIndex: newIndex})
  }
  deleteNote = async (note) => {
    const noteIn = this.state.notes.indexOf(this.state.notes.filter(n=> n === note)[0])
    await this.setState({notes: this.state.notes.filter(n=> n !== note)})
    if(this.state.selectedNoteIndex === noteIn){
      this.setState({selectedNoteIndex: null,selectedNote: null})
    }
    else{
      this.setState({selectedNoteIndex:this.state.notes.indexOf(this.state.notes.filter(n=> n === this.state.selectedNote)[0])})
    }
    firebase.firestore().collection('notes').doc(note.id).delete().then(data => console.log(data))

  }
}

export default App;
