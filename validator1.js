const Ajv = require("ajv");
const ajv = new Ajv({ allErrors: true });

// json 파일 가져오기
const jsonFile = require('./json/local.json');

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

// 에러를 담을 빈 배열 생성하기
let allErrors = [];

// 검증하기
jsonData.forEach((c) => {
  console.log("nID: " + c[Object.keys(c)[0]]);
  test(c);
  console.log('----------')
});

function test(data) {
  const valid = validate(data);
  if (!valid) {
    allErrors.push({
      ID: data[Object.keys(data)[0]],
      err: ajv.errorsText(validate.errors)
    });
  } else console.log('Valid!');
};

if (allErrors.length) {
  console.log(allErrors);
} else console.log('No Errors!');