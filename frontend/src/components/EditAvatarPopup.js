import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function EditAvatarPopup(props) {

    const inputRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();
      
        props.onUpdateAvatar({
          avatar: inputRef.current.value
        });
      } 

    return(
        <PopupWithForm
          name = 'avatar'
          title = 'Обновить аватар'
          isOpen = {props.isOpen}
          onClose = {props.onClose}
          onCloseByOverlay = {props.conCloseByOverlay}
          onSubmit = {handleSubmit}>
          <input id="user-avatar-input" type="url" ref={inputRef} className="popup__input popup__input_el_user-avatar" name="user-avatar" placeholder="Ссылка на картинку" required />
          <span id="user-avatar-input-error" className="popup__input-error"></span>
          <button className="popup__submit-button popup__submit-button_type_avatar" type="submit">Сохранить</button>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;