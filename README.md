[![Netlify Status](https://api.netlify.com/api/v1/badges/4014a5db-95d0-408c-aa8d-6b73637b1eaf/deploy-status)](https://app.netlify.com/sites/keen-clarke-aac242/deploys)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![Npm Version](https://img.shields.io/badge/npm-v17.3.1-green)](https://www.npmjs.com/package/npm)

# Anon-Wall

익명을 기반으로 하는 가족 및 인생에 대한 고민을 상담해주는 웹사이트입니다.
모든 유저가 고민을 나누는 카운슬리로 활동할 수 있고 고민을 상담해주는 카운슬러가 될 수도 있습니다.

<br>

## **Motivation**

아버지, 어머니, 아들 그리고 딸이라는 가족 구성원으로서 어떻게 하면 가족의 불화를 해결할 수 있고 더 행복한 가정을 이룰 수 있을지 고민하는 사람이 많다고 생각합니다. 이러한 어려움을 겪고 있는 사람들을 위해 웹사이트를 만들고 싶었습니다. 가족 이야기 뿐만 아니라 인생에 대한 조언도 구할 수도 있습니다.

개인의 호칭은 아버지, 어머니, 아들, 딸로만 한정이 됩니다. 모든 사람의 인생사는 다르기 때문에 해시태그에 자신을 드러낼 수 있는 특징만 작성합니다. 예를 들어, #한부모아들 #한부모딸 #기러기엄마 #기러기아빠 등이 있습니다.

<br>

## **STACK**

_**FrontEnd**_

- JavaScript ES2015+
- React
- Redux
- Redux-toolkit
- Redux-thunk
- Styled-component
- Firebase
- Socket.io-client
- Simple-peer

_**BackEnd**_

- Node.js
- Express
- MongoDB
- Mongoose
- JWT (JSON Web Token)
- Socket.io

<br>

## **🗓 Planning**

### **프로젝트 기간**

- **2022.01.24 ~ 2022.01.30 (1주차)**

  아이디어 기획

  <details>
    <summary>목업 디자인</summary>

  [Figma 이동하기](https://www.figma.com/file/mtyHTjAUPdEZV3QThhvsdH/k-coding's-mockup?node-id=0%3A1)

    <image src="./readme-assets/figma.png" width="65%" />
  </details>

  <details>
    <summary>DB 스키마 모델</summary>

  [Lucidchart 이동하기](https://lucid.app/lucidchart/5932fe28-1d54-4c4e-85ca-5da20d4d40a9/edit?invitationId=inv_3d603c00-eefd-45c7-ae81-a9ff22010e6b)

    <image src="./readme-assets/Schema.png" width="65%" />
  </details>

  <details>
    <summary>태스크 카드 작성</summary>
    <image src="./readme-assets/jira.png" width="65%" />
  </details>

  세부 기능 설계 및 검증

- **2022.02.7 ~ 2022.02.13 (2주차)**

  개발 진행

- **2022.02.14 ~ 2022.02.18 (3주차)**

  개발 마무리

  배포(netlify, AWS Elastic BeanStalk)

  테스트코드 작성

<br>
<br>

## **관련 링크**

- **Deploy Site** : **https://www.anon-wall.xyz**

- **Github Repositories**

  - FrontEnd : **https://github.com/anon-wall/anon-wall-frontend**
  - BackEnd : **https://github.com/anon-wall/anon-wall-backend**

  <br>

## 사용하려면...

<details>
  <summary>클라이언트</summary>
  .env 파일에 아래와 같이 환경 변수를 입력해 주세요.

```javascript
 REACT_APP_FIREBASE_API_KEY=
 REACT_APP_FIREBASE_AUTH_DOMAIN=
 REACT_APP_FIREBASE_PROJECT_ID=
 REACT_APP_FIREBASE_STORAGEBUCKET=
 REACT_APP_FIREBASE_MESSAGING_SENDER_ID=
 REACT_APP_FIREBASE_APP_ID=
 REACT_APP_FIREBASE_DATABASE_URL=
 REACT_APP_LOCAL_SERVER_URL=
```

</details>

<details>
  <summary>서버</summary>
  .env 파일에 아래와 같이 환경 변수를 입력해 주세요.

```javascript
 MONGODB_URL=
 ACCESS_TOKEN_SECRET=
 CLIENT_URL=
 NODEMAILER_USER=
 NODEMAILER_PASS=
```

</details>

<br>

## User Guide

**고민담벼락**

<details>
  <summary>태그를 검색하여 원하는 고민을 찾을 수 있습니다.</summary>
  <image src="./readme-assets/search.gif" width="400px" />
</details>

< 카운슬리 >

<details>
  <summary>고민을 등록하기 위해서는 로그인이 필요합니다.</summary>
  <image src="./readme-assets/needLogin.gif" width="400px" />
</details>
<details>
  <summary>자신의 고민을 등록합니다.</summary>
  <image src="./readme-assets/add.gif" width="400px" />
</details>
<details>
  <summary>상담을 수락한 카운슬러의 목록을 확인할 수 있습니다.</summary>

- 카운슬러를 클릭하면 예약하기 페이지로 넘어갑니다.
- 예약하기 페이지에서 카운슬러의 정보를 확인할 수 있습니다.
- 예약하기 버튼을 누르면 확정된 날짜와 시간을 이메일로 보내줍니다.
- 예약이 확정되었으므로 해당 고민은 고민담벼락에서 사라집니다.

<image src="./readme-assets/reservation.gif" width="400px" />
<image src="./readme-assets/email.gif" width="400px" />
</details>

< 카운슬러 >

<details>
  <summary>상담해주고픈 고민에 사연 수락하기 버튼을 누릅니다.</summary>

- 자신의 고민에는 상담수락하기 버튼이 보이지 않습니다.
- 동일한 고민에 대한 사연 수락은 한번만 가능합니다.
<image src="./readme-assets/clickAcceptButton.gif" width="400px" />
</details>

<br>

**나의 담벼락**

<details>
  <summary>내 정보</summary>

- 가입정보를 확인할 수 있습니다.
- 자신의 고민의 예약 상황을 확인할 수 있습니다.

<image src="./readme-assets/mypageMain.gif" width="400px" />
</details>
<details>
  <summary>카운슬러</summary>

- 카운슬러로 활동하기 위한 정보 등록 및 수정할 수 있습니다.
- 상담 신청한 고민 예약 상황을 확인할 수 있습니다.
- 스케줄을 관리할 수 있습니다.

  - 일주일 단위의 정기적인 스케줄을 입력할 수 있습니다.
  - 예외가 발생한 날짜의 스케줄을 별도로 입력할 수 있습니다.

  <image src="./readme-assets/mypageCounselor.gif" width="400px" />

</details>
<details>
  <summary>나의 고민</summary>

- 자신의 작성한 고민들을 한눈에 볼 수 있습니다.
- 예약 완료, 예약 진행중, 상담 완료인지 상태를 확인할 수 있습니다.

<image src="./readme-assets/mypageMyStory.gif" width="400px" />
</details>

<br>

**채팅방**

<details>
  <summary>나의 담벼락에서 채팅방으로 입장하실 수 있습니다.</summary>

- 상담시간이 되면 입장하기 버튼이 활성화됩니다.
- 종료시간이 되면 자동으로 채팅방이 종료됩니다.

<image src="./readme-assets/chatroom.gif" width="400px" />
</details>

<br>

## **Development Log**

### <i>**Task Card 작성**</i>

프로젝트에서 칸반 Task Card를 작성할 때 프론트엔드와 백엔드로 나누어서 진행을 하였습니다. 전반적으로 프론트엔드는 페이지를 기준으로 작성을 하였으며 백엔드는 API를 기준으로 작성하였습니다. 대부분의 경우 프론트엔드가 조금 앞서서 계획이 되어있거나 마감기한이 같은 날이었습니다. 이렇게 개발을 진행 하였을 때 다음과 같은 문제를 겪었습니다.

- 프론트엔드에서 UI부분과 기능적인 부분들을 구현을 하고 실제로 API서버에 요청하여 테스트를 해보아야 하는데 백엔드가 구현이 되지 않은 상황 발생하였습니다. 그리고, 목업 데이터를 만들고 테스트를 하였다가 다시 백엔드가 완성이 되었을 때 로직이 정상적으로 작동을 하는지 테스트를 해보아야 했습니다. 이는 곧 생산성에 악영향을 미쳤습니다.
- 프로젝트가 50%정도 진행이 되었을 때 백엔드의 미구현이 프론트엔드의 생산성 저하에 크게 영향을 미친다는 것을 인식을 하게 되었고, 팀원들과 협의를 하여 백엔드를 우선 구현을 하고 프론트엔드를 구현을 하는 것으로 결정을 하여 프로젝트 개발을 이어서 진행하였습니다. 그리하여, 기존보다 프론트엔드 작업 속도가 빨라진 것을 체감할 수 있었습니다.

### <i>**Git**</i>

저희는 대표적인 Git 전략 중 하나인 Git-Flow를 git branch 전략으로 채택하여 `feature` branch를 만들어 작업하는 Feature Branch Workflow 방식으로 branch를 관리하였습니다.

이러한 방식을 채택하게 된 이유는 다음과 같습니다.

- 소규모 인원의 프로젝트에서 사용하는 협업 방식
- `main` branch 오염 방지
- 쉬운 기능별 commit 내역 조회
- Pull request를 사용하여 코드에 대한 추가, 삭제 및 수정된 사항에 대해 팀 구성원과의 소통 촉진

또한 저희는 git utility 중 하나인 `git rebase`로 병합시킴으로써 각 `feature` branch에 대한 응집력있는 git history를 만들었습니다. 이러한 방식으로 프로젝트를 진행함으로써 clean history를 만들 수 있었고 `develop` branch에 대해 선형 그래프를 그려낼 수 있었습니다.

저희가 진행한 방식은 적응하기까지 시간이 좀 걸리고 헷갈리는 부분들도 있었지만 실제 협업에서 사용하는 방식을 이해하고 경험해볼 수 있다는 점이 인상깊었습니다. 또한 저희가 의도한대로 이상적인 git graph를 그릴 수 있었다는 점에서 성취감을 느꼈습니다.

### <i>**Handling Dates**</i>

프로젝트를 진행하면서 가장 중요하게 여겼던 부분 중 하나가 바로 상담 예약 관리였습니다. 카운셀러와 카운셀리 양측의 위치에 따라 날짜를 저장하고 불러와야 하는 민감한 주제이기도 했습니다.

따라서 클라이언트에서 날짜를 다룰때, 로컬시간을 국제표준시간인 UTC시간으로 변경하여 서버에 ISO 형식으로 저장하였습니다. 그리고 서버에 ISO 형식으로 저장된 날짜 정보를 클라이언트에서 사용할 때 로컬시간으로 변환하여 시간대를 동기화하여 사용하였습니다.

저희가 원하는 방식으로 날짜 데이터를 저장하고 보여주기 위해서 객체 구조를 다시 빌드업하여 사용자가 원하는 시간대를 자유롭게 설정하고, 저장된 데이터만 캘린더에 그려줄 수 있도록 도전하였습니다.

### <i>**redux-thunk**</i>

#### 사용이유

- 전역으로 관리하는 상태의 비동기 통신과 관련된 액션을 thunk에서 관리하므로 관심사 분리가 가능하여 사용하였습니다.
- saga와 thunk의 선택지에서 많은 고민을 했습니다. 하지만 thunk를 선택한 이유는 팀원들이 thunk나 saga를 공부해보지 않은 것을 알고 있는데 진입 장벽이 어려운 saga를 혼자 공부해서 프로젝트에 적용을 한다면 다른 팀원들에게 큰 부담이 된다고 생각을 하였습니다. 그래서 단기 프로젝트이기에 런타임이 적은 thunk를 선택하였습니다.

#### 아쉬운점

- 리덕스에서 비동기 작업에 대한 pending, success, failure 상태가 명확하게 보여졌지만, 이에 따른 비동기 Loading이나 Error에 대한 부분을 UI로 보여주는 데에 활용하지 못한 점이 아쉽습니다.

<br>

## **challenge**

### <i>배포 후 쿠키 이슈</i>

- 배포 전에는 RESTful API 구조를 위해 클라이언트에서 토큰을 발급하여 쿠키에 저장하였습니다. 하지만 클라이언트 도메인과 서버 도메인이 상하위 관계의 도메인이 아니여서 클라이언트 도메인으로 발급된 쿠키는 서버 도메인에서 접근할 수가 없었습니다. 그래서 토큰 저장 방법을 쿠키에서 로컬스토리지로 변경하여 해결하였습니다.

### <i>WebRTC 연결 해지 문제</i>

- 실시간으로 음성 및 영상통화를 위해 WebRTC(simple-peer)기술을 사용하여 P2P연결 기능을 구현하였습니다. 이 과정에서 입장과 퇴장과 관련하여 문제가 발생하였습니다. 웹 브라우저를 닫아서 종료를 하는 경우에는 정상적으로 연결 해제가 되었지만 다른 라우터로 이동하여 연결 해제를 시도하는 경우 정상적으로 연결이 끊기지 않았습니다. 원인은 컴포넌트가 Unmount되면서 연결 해제에 대한 핸들링이 정상적으로 이루어지지 않은 것이 원인이었습니다. 등록된 리스너들을 모두 해지하고 유저가 나간 정보를 Socket에 이벤트를 발생시켜 다른 유저에게 알려주어 destroy를 하여 해결을 할 수 있었습니다. WebRTC가 웹 브라우저간의 P2P연결 이라는 것을 다시 한번 상기시킬 수 있었고 서버와 Socket은 단지 시그널링 서버의 역할이라는 것도 한 번 더 느낄 수 있는 계기가 되었습니다.

<br>

## **마지막 한마디**

**나상민**
팀 프로젝트를 진행하면서 의사결정과 커뮤니케이션에 대한 중요성을 더 깨닫게 되는 순간이었습니다. 개인 프로젝트를 진행할 때는 혼자서 모든 것을 결정하고 기획하고 구현을 하면 되기 때문에 의사결정 빠르게 할 수 있었습니다. 반대로, 팀 프로젝트에서는 모든 결정들은 팀원과 함께 공유되어야 하고 결정도 같이해야 했습니다. 하나의 문제를 결정하더라도 방법이 팀원마다 생각하는 방향이 다르기 때문에, 해결책을 제시할 때도 합당한 근거를 가지고 부드럽게 의사소통하며 설득하려고 노력하였습니다. 이때 “Why?”라는 사고를 한 번 더 거치게 되고 의견을 더 잘 전달하기 위하여 정리하며 함께 성장할 수 있었던 발판이 되었던 것 같습니다.

**박규리**
누구보다도 배워 나가는데 열과 성을 다하시는 팀원 두 분을 만나서 진행하게 된 첫 협업 경험은 정말 소중한 기회였다고 생각합니다. 제 생각대로 UI가 만들어지지 않을 때, 데이터를 관리하는 게 더 낫겠다며 먼 산을 바라봤던 적이 있습니다. 그때 오히려 저를 위해서 못 하겠더라도 일단 해보자고 독려해주시고 옆에서 도와주신 팀원분들 덕분에 잘 마무리할 수 있었습니다. 열정적인 중재자에게 팀 리더의 자리를 맡겨주신 것도 정면 돌파하는 힘을 기르고 책임감을 느끼도록 하는 누군가의 큰 그림이 아니었나 싶습니다.
앞으로 사용할 기술에 대해 깊이 있게 이해하고 어떤 결과를 낼지 예측해서 개발할 수 있었다면 좋았을 걸 하는 생각이 들어서 앞으로 개선해나가고 싶은 점입니다.

**임소정**
팀에 피해를 끼치지 않기 위해서, 팀원 간의 커뮤니케이션에 많은 노력을 해야 하고 계획을 생각했던 것보다 더 세세하게 만들어야 원활하게 협업이 이루어진다는 것을 배웠습니다.
팀원 간에 의견이 좁혀지지 않는 상황을 맞닥뜨렸을 때는 힘들었지만 결국에는 서로가 좋은 코드를 짜기 위한, 더 좋은 웹사이트를 만들기 위해 의견 충돌이 생긴다는 것을 이해하게 되면서 다른 의견들을 인정하게 되고 받아드리게 된 것 같습니다. 팀원들에게서 배운 것도 많았는데 상민님께는 꼼꼼함과 깊게 생각하는 점을 배웠고 규리님께는 디테일에 신경쓰는 것, 많은 검색을 통한 정보 수집하는 것을 배웠습니다.

<br>

## **Contact**

나상민 sangmin.iam@gmail.com | https://github.com/sangmin-iam
박규리 skylarkrpark@gmail.com | https://github.com/merkyuri
임소정 thwid9897@gmail.com | https://github.com/sojungLIMM
