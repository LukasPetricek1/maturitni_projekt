const { ADD_HOBBY, CONNECT_USER_AND_HOBBY , GET_USER_HOBBIES , GET_ALL_HOBBIES , DELETE_USER_HOBBY } = require("../queries/hobbies")

const mysql = require("mysql2");
const config = require("../db/config");
const pool = mysql.createPool({ 
  ...config,
  multipleStatements : true
});

exports.addHobby = function(hobby){ 
  return new Promise((resolve, reject) => {
    pool.query(ADD_HOBBY(hobby) , (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

exports.deleteHobby = function(user_id, hobby){ 
  return new Promise((resolve, reject) => {
    pool.query(DELETE_USER_HOBBY(user_id, hobby) , (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

exports.connectUserAndHobby = function(hobby_id, user_id){ 
  return new Promise((resolve, reject) => {
    pool.query(CONNECT_USER_AND_HOBBY(hobby_id, user_id) , (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

exports.getUserHobbies = function(username){ 
  return new Promise((resolve, reject) => {
    pool.query(GET_USER_HOBBIES(username) , (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

exports.getAllHobbiesFunction = function(user_id){ 
  return new Promise((resolve, reject) => {
    pool.query(GET_ALL_HOBBIES , +user_id,  (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}