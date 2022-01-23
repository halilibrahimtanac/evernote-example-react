import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './style';
import List from '@material-ui/core/List';
import { Divider, Button } from '@material-ui/core';
import SidebarItemComponent from '../sidebarItem/sidebarItem';

class SidebarComponent extends React.Component {

    constructor(){
        super()
        this.state = {
            addingNote: false,
            title : null
        }
    }

    render(){
        const {classes,notes,selectedNoteIndex} = this.props
        if (notes){
          return (
            <div className={classes.sidebarContainer}>
                <Button className={classes.newNoteBtn}
                onClick={this.btnClick}>{this.state.addingNote ? 'cancel':'new note'}</Button>
                {
                    this.state.addingNote ?
                    <div>
                        <input type="text"
                        className={classes.newNoteInput}
                        placeholder='Enter new note title...'
                        onKeyUp={(e)=> this.onChange(e.target.value)}></input>
                        <Button className={classes.newNoteSubmitBtn} onClick={this.submitTitle}>submit</Button>
                    </div>:null
                }
                <List>
                {
                    notes.map((note,index)=>{
                        return (
                            <div key={index}>
                                <SidebarItemComponent
                                note={note}
                                index={index}
                                selectedNoteIndex={selectedNoteIndex}
                                selectNote={this.selectNote}
                                deleteNote={this.deleteNote}></SidebarItemComponent>
                                <Divider></Divider>
                            </div>
                            
                        )
                    })
                }
                </List>
            </div>
        )  
        }
        else {
            return(<h5>there is no note here</h5>)
        }
        
    }
    btnClick = () => {
        this.setState({title: null,addingNote:!this.state.addingNote})
    }
    onChange = (txt) => {
        this.setState({title:txt})
    }
    submitTitle = () => {
        this.props.newNote(this.state.title)
        this.setState({addingNote:false,title: null})
    }
    selectNote = (note,index) => {
        this.props.selectNote(note,index)
    }
    deleteNote = (note) => {
        this.props.deleteNote(note)
    }
}

export default withStyles(styles)(SidebarComponent)