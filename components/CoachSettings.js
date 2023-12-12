"use client";
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile, toggleEdit } from './coachSlice';

const InlineEdit = ({ label, value, setValue, isEditing, onEditToggle }) => {
  const [editingValue, setEditingValue] = useState(value);

  const onChange = (event) => setEditingValue(event.target.value);

  const onKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.target.blur();
    }
  };

  const onBlur = (event) => {
    if (event.target.value.trim() === '') {
      setEditingValue(value);
    } else {
      setValue(event.target.value);
    }
  };

  return (
    <div>
      <label>{label}</label>
      {isEditing ? (
        <input
          type="text"
          aria-label={label}
          value={editingValue}
          onChange={onChange}
          onKeyDown={onKeyDown}
          onBlur={onBlur}
        />
      ) : (
        <span>{value}</span>
      )}
      {isEditing && (
        <button onClick={onEditToggle}>Save</button>
      )}
    </div>
  );
};

const CoachSettings = () => {
    const dispatch = useDispatch();
    const coachState = useSelector((state) => state.coach);
    const {
      lastname,
      firstname,
      email,
      photo,
      games,
      price,
      socials,
      about,
      bookings,
      isEditing,
    } = coachState;
  
    const handleEditToggle = () => {
      if (isEditing) {
        const formData = new FormData();
        formData.append('lastname', lastname);
        formData.append('firstname', firstname);
        formData.append('email', email);
        formData.append('photo', photo);
        formData.append('games', JSON.stringify(games));
        formData.append('bookings', JSON.stringify(bookings));
        formData.append('twitch', socials.twitch);
        formData.append('instagram', socials.instagram);
        formData.append('youtube', socials.youtube);
        formData.append('discord', socials.discord);
        formData.append('about', about);
  
        fetch('http://192.168.1.65:3000/profile', {
          method: 'POST',
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.result) {
              // Dispatch the updateProfile action with the updated profile data
              dispatch(updateProfile(data.profile));
            } else {
              console.error('Failed to update Coach Profile:', data.message);
            }
          });
      }
      // Dispatch the toggleEdit action
      dispatch(toggleEdit());
    };
  
    return (
      <div>
        <InlineEdit label="Last Name" value={lastname} setValue={(value) => setLastname(value)} isEditing={isEditing} onEditToggle={handleEditToggle} />
        <InlineEdit label="First Name" value={firstname} setValue={(value) => setFirstname(value)} isEditing={isEditing} onEditToggle={handleEditToggle} />
        <InlineEdit label="Email" value={email} setValue={(value) => setEmail(value)} isEditing={isEditing} onEditToggle={handleEditToggle} />
        <InlineEdit label="Photo" value={photo} setValue={(value) => setPhoto(value)} isEditing={isEditing} onEditToggle={handleEditToggle} />
        <InlineEdit label="Last Name" value={bookings} setValue={(value) => setBookings(value)} isEditing={isEditing} onEditToggle={handleEditToggle} />
        <InlineEdit label="Games" value={games.join(', ')} setValue={(value) => setGames(value.split(', ').map((game) => game.trim()))} isEditing={isEditing} onEditToggle={handleEditToggle} />
        <InlineEdit label="Price for One Session" value={price.oneSession.toString()} setValue={(value) => setPrice({ ...price, oneSession: Number(value) })} isEditing={isEditing} onEditToggle={handleEditToggle} />
        <InlineEdit label="Socials" value={JSON.stringify(socials)} setValue={(value) => setSocials(JSON.parse(value))} isEditing={isEditing} onEditToggle={handleEditToggle} />
        <InlineEdit label="About" value={about} setValue={(value) => setAbout(value)} isEditing={isEditing} onEditToggle={handleEditToggle} />
        <button onClick={handleEditToggle}>{isEditing ? 'Cancel' : 'Edit'}</button>
      </div>
    );
  };
  
  export default CoachSettings;