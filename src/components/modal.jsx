import "/public/css/modal.css"
function Modal({ children, isOpen, onClose ,title="modal title",is_to_error=false}) {
    if (!isOpen) return null;
    const handleModalClick = (e) => {
        e.stopPropagation();
    };
    const handleOutsideClick = () => {
        onClose();
    };
    return (
        <div className={`modal ${is_to_error?'has-error':''}`} onClick={handleOutsideClick}>
            <div className="modal-content" onClick={handleModalClick}>
                <button className="modal-close-button small red" onClick={handleOutsideClick}>cerrar</button>
                <h2>{title}</h2>
                <hr />
                {children}
            </div>
        </div>
    )
}


export {
    Modal
}