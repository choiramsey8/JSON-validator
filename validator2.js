const Ajv = require("ajv");
const ajv = new Ajv({ allErrors: true });
const fs = require('fs');

// 폴더에서 json 파일 리스트 불러오기
fs.readdir('./json', (err, files) => {
  const jsonList = files.filter(e => e.split('.')[e.split('.').length - 1] === 'json');

  // 에러를 담을 빈 배열 생성하기
  let allErrors = {};

  // 파일명 리스트에서 파일 하나 하나 작업하기
  jsonList.forEach(e => {

    const keyName = e.split('.')[0];
    allErrors[keyName] = [];

    // json 파일 가져오기
    const jsonFile = require('./json/' + e);

    // 가져온 json 파일 파싱하기
    const jsonData = JSON.parse(JSON.stringify(jsonFile));

    // 빈 schema 객체 만들어놓기
    let schema = {};

    // schema 객체를 채우는 함수 생성
    // Parameter pj = parsedJson
    const makeSchema = (pj) => {
      schema.type = typeof pj[0];

      // data type 정의해두기
      const fixedType = {
        n: 'number',
        d: 'number',
        s: 'string',
        l: 'object',
        b: 'number'
      };

      const columnNames = Object.keys(pj[0]);

      schema.properties = {};
      columnNames.forEach((n) => {
        if (fixedType[n[0]] === 'object' && Object.prototype.toString.call(pj[0][n]) === '[object Array]') {
          schema.properties[n] = { type: 'array' }
        } else schema.properties[n] = { type: fixedType[n[0]] }
      })

      schema.required = columnNames;
      schema.additionalProperties = false;
    }
    // schema 생성하기
    makeSchema(jsonData);

    const validate = ajv.compile(schema);

    // 검증하기
    console.log('file name: ', e)
    jsonData.forEach((c) => {
      console.log("nID: " + c[Object.keys(c)[0]]);
      test(c);
      console.log('----------')
    });

    // 검증하는 함수 생성
    function test(data) {
      const valid = validate(data);
      if (!valid) {
        allErrors[keyName].push({
          ID: data[Object.keys(data)[0]],
          err: ajv.errorsText(validate.errors)
        });
      } else console.log('Valid!');
    };
  })

  for (const key in allErrors) {
    if (allErrors[key].length === 0) {
      delete allErrors[key];
    }
  }

  if (Object.keys(allErrors).length) {
    console.log(allErrors);
  } else console.log('No Errors!');
});
