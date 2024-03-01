import axios from "axios";

export const baseURL = 'http://localhost:8080';
export const userProfilePictureBaseURL = (userId, profilePicture) => `${baseURL}/user-upload/${userId}/${profilePicture}?t=`+ new Date().getTime() ;
export const userVehicleURL = (userId, fileName) => `${baseURL}/user-upload/${userId}/${fileName}?t=`+ new Date().getTime() ;
export const uploadProfilePictureServiceURL = 'http://localhost:8080/users/uploadProfilePicture';

export const apiClient = axios.create({
  baseURL: baseURL,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})
