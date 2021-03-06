
import {TIME_OUT_SEC} from './config.js'
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
    try {
  
  const res = await fetch(url);
  const data = await res.json();

        if(!res.ok){
            throw new Error(`${data.message}`)
          };
          return data;
    } catch (error) {
        throw error
    }
} 