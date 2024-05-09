const fs = require('fs');
const path = require('path');
const filePath = path.resolve(__dirname, '..', 'dev-data', 'visits-data.json');

const getJSONData = async (path) => {
  try {
    const data = await new Promise((resolve, reject) => {
      fs.readFile(path, 'utf8', (err, data) => {
        if (err) reject(err);
        resolve(data);
      });
    });

    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

const setVisits = async (path, data) => {
  const objVisit = {
    numVisits: data,
  };

  try {
    const data = await new Promise((resolve, reject) => {
      fs.writeFile(path, JSON.stringify(objVisit), (err) => {
        if (err) {
          console.error(err);
        } else {
          resolve(objVisit);
        }
      });
    });

    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.getNumVisits = async (req, res, next) => {
  try {
    let data = await getJSONData(filePath);
    data = JSON.parse(data);
    console.log(data);
    res.status(200).json({
      status: 'success',
      numVisits: data.numVisits,
    });
  } catch (err) {
    console.error(`🔥🔥${err.message}`);
    res.status(500).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.setNumVisits = async (req, res, next) => {
  try {
    let visits = await getJSONData(filePath);
    visits = JSON.parse(visits);

    console.log(visits);

    let data = await setVisits(filePath, visits.numVisits + 1);
    console.log(data);

    res.status(200).json({
      status: 'success',
      numVisits: data.numVisits,
    });
  } catch (err) {
    console.error(`🔥🔥${err.message}`);
    res.status(500).json({
      status: 'fail',
      message: err.message,
    });
  }
};