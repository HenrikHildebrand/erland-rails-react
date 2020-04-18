import React from 'react'
import QuestionDialog from './QuestionDialog/QuestionDialog'

const QuestionDialogs = (props) => {
    
    const onClose = (save, selected) => {
        props.onClose(save, selected)
    }


    return(
        props.questions.map((question, index) => (
            <QuestionDialog
                key={index}
                question={question}
                open={props.current.open && props.current.index === index}
                onClose={onClose}
                />
        ))
    );
}


export default QuestionDialogs;