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

const setVisits = (path, data) => {
  const objVisit = {
    numVisits: data,
  };

  try {
    fs.writeFile(path, JSON.stringify(objVisit), (err) => {
      if (err) {
        console.error(err);
      }
    });

    return objVisit;
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.getNumVisits = async (req, res, next) => {
  try {
    let data = await getJSONData(filePath);
    data = JSON.parse(data);

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

    let data = setVisits(filePath, visits.numVisits + 1);
    console.log(visits);
    console.log(data);

    res.status(201).json({
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
