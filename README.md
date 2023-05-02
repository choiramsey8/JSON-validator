# JSON 파일 검증 도구

## Description

JSON 파일 내의 데이터가 사전 정의된 스키마에 부합하는지 검증하는 도구

---

## Prerequisite

- Ajv

  (참고: https://ajv.js.org/)

---

## Installation

```
npm install
```

---

## Usage

\*\* (공통) 항상 json 폴더에 작업할 JSON 파일을 미리 넣어둘 것

1. JSON 파일 1개 작업 시

   - validator1.js 사용
   - 작업할 파일 불러오기

     ```
     const jsonFile = require('작업할 파일 경로');

     // 예시
     // const jsonFile = require('./json/local.json');
     ```

   - 파일 실행하기
     ```
     // JSON 파일 1개 작업 시
     node validator1
     ```
   - 에러 확인(스키마에 맞지 않는 값이 입력되어 있을 시 발생)

     - 에러가 없으면 각 항목 아래에 'Valid!' 표시
     - 각 항목에 에러가 있을 시 에러 내용이 에러 객체에 담김
     - 작업이 끝나면 콘솔 최하단에 모든 에러가 출력됨

     ```
     // 에러 없는 경우
     file name:  supportpick_reward.json
     nID: 1
     Valid!
     ----------
     nID: 2
     Valid!
     ----------
     No Errors!

     // 에러 있는 경우(콘솔 최하단)
     {
      파일명: [
        { ID: 23, err: 'data.sStringKor should be string' },
        { ID: 10000014, err: 'data.sStringKor should be string' }
      ]
     }
     ```

2. 폴더 내 모든 JSON 파일 작업 시

   - validator2.js 사용
   - 파일 실행하기
     ```
     // 폴더 내 모든 JSON 파일 작업 시
     node validator2
     ```
   - 에러 확인(스키마에 맞지 않는 값이 입력되어 있을 시 발생)

     - 에러가 없으면 각 항목 아래에 'Valid!' 표시
     - 각 항목에 에러가 있을 시 에러 내용이 에러 객체에 담김
     - 작업이 끝나면 콘솔 최하단에 모든 에러가 출력됨

     ```
     // 에러 없는 경우
     file name:  supportpick_reward.json
     nID: 1
     Valid!
     ----------
     nID: 2
     Valid!
     ----------
     No Errors!

     // 에러 있는 경우(콘솔 최하단)
     {
      파일명: [
        { ID: 23, err: 'data.sStringKor should be string' },
        { ID: 10000014, err: 'data.sStringKor should be string' }
      ]
     }
     ```

3. (공통) 에러 내용 설명
   - ID: 해당 row의 nID 값(단, const.json는 nnID 값)
   - err: 해당 컬럼이 준수해야 하는 데이터 타입 안내

---

## License

만든이: 최진우

프리것버드 버디스쿼드 프로젝트에 필요한 검증 과정을 위해 제작하였습니다.
