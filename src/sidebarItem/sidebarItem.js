import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './style';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import { removeHTMLTags } from '../helpers';


class SidebarItemComponent extends React.Component {

    
    render(){
        const { index, note, classes, selectedNoteIndex} = this.props
        return (
            <div key={index}>
                <ListItem
                className={classes.listItem}
                selected={selectedNoteIndex === index}
                alignItems='flex-start'>
                    <div
                    className={classes.textSection}
                    onClick={()=> this.selectNote(note,index)}>
                        <ListItemText
                        primary={note.title}
                        secondary={removeHTMLTags(note.body.substring(0,30) + '...')}></ListItemText>
                    </div>
                    <DeleteIcon className={classes.deleteIcon} onClick={()=> this.deleteNote(note)}></DeleteIcon>
                </ListItem>
            </div>
        )
    }
    
    selectNote = (note,index) => this.props.selectNote(note,index)
    deleteNote = (note) => {
        if (window.confirm(`Are you sure delete this note: ${note.title}?`)){
            this.props.deleteNote(note)
        }
    }
}

export default withStyles(styles)(SidebarItemComponent)