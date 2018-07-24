import {assert} from 'chai';
import {payload, people} from '../serialization';
// you can ge row data form payload.js file

describe('payload', function () {

  // in this tests try to use as least as possible number of assignments

  it('car quantity with owners older than 20 years', function () {

    let answer = 0;
    payload.data.forEach((item) => {
      item.owners.forEach((element) => {
        if(element.personalInfo.age > 20 && item.type === 'Car'){
          answer += 1
        }
      });
    });

    assert.equal(answer, 2);

  });

  it('all car colors separated by comma without duplicates', function () {

    let arr = [];
    payload.data.forEach((item) => {
      if(item.type === 'Car') {
        arr.push(item.attrs.color)
      }
    });

    let unicArr = arr.filter((item, pos) => {
      return arr.indexOf(item) == pos;
    });

    let answer = unicArr.join(',');
    assert.equal(answer, 'red,yellow');

  });

  it('id\'s of all vehicles separated by comma', function () {

    let arr = [];
    payload.data.forEach((item) => {
        arr.push(item.id)
    });

    let unicArr = arr.filter((item, pos) => {
      return arr.indexOf(item) == pos;
    });

    let answer = unicArr.join(',');

    assert.equal(answer, '1,3,6,4,2');

  });

  it('summary price of all items', function () {

    let arr = [];
    payload.data.forEach((item) => {
        arr.push(item.attrs.price)
    });

    let answer = arr.reduce((acc, currValue) => {
      return acc + currValue;
    }, 0)

    assert.equal(answer, 42800);

  });

  it('price of all things john has own', function () {

    let arr = [];

    payload.data.forEach((item) => {
      item.owners.forEach((element) => {
        if(element.firstName === 'john'){
          arr.push(item.attrs.price)
        }
      });
    });

    let answer = arr.reduce((acc, currValue) => {
      return acc + currValue;
    }, 0)

    assert.equal(answer, 25000);

  });

  it('all cities', function () {

    let arr = [];
    payload.data.forEach((item) => {
      item.owners.forEach((element) => {
        arr.push(element.cities)
      });
    });

    let unicArr = arr.filter((item, pos) => {
      return arr.indexOf(item) == pos;
    });

    let answer = unicArr.join(',');
    assert.equal(answer, 'New York,Boston,Columbia,Rapture');

  });
});
