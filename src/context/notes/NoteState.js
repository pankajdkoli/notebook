
import NoteContext from './noteContext';


const NoteState = (props) => {

    const state = {
        "name": "pankaj",
        "class": "3"

    }
    return (

        <NoteContext.Provider value={state}>

            {props.children}

        </NoteContext.Provider>

    )
}

export default NoteState;

