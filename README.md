# tic-tac-toe-web

## tic-tac-toe-web
tic-tac-toe 게임 서버와 웹 프론트엔드를 구현한 웹 프로젝트이며 로그인, 로그아웃, 소셜 로그인, 회원가입을 통해 회원이 웹 서비스를 이용할 수 있도록 구현했고 만약 관리자 회원 권한으로 로그인하면 회원 목록(페이지 처리 및 검색 기능), 회원 상세보기 그리고 회원 수정/삭제 기능을 통해 회원 관리할 수 있도록 구현했습니다. 그리고 로그인 여부와 상관 없이 컴퓨터와 틱택토 대결할 수 있도록 구현했습니다.
<br/><br/>
● 제작기간 : 2023.09.28~2023.10.19(22일)(1인 프로젝트)

### 개발 환경
> 1. Nest.js 10.0.0<br/>
> 2. TypeScript 5.1.3<br/>
> 3. Node.js 18.12.1<br/>
> 4. Vue.js 3.3.4<br/>
> 5. Tailwindcss 3.3.3<br/>
> 6. MySQL 8.0.33

### IDE
> 1. Visual Studio Code<br/>

## API 문서
● http://localhost:3000/api-docs

## ERD 다이어그램 링크
● https://www.erdcloud.com/d/QQZDkNCDEfw625QKi

## 서버에서 적용했던 주요 기술
● bcrypt npm 모듈를 통해 bcrypt 해시 암호화 알고리즘을 적용함으로써 회원에 대한 보안성을 높였습니다. <br/>
● JWT 토큰 인증 방식으로 회원을 인증하도록 하여 서버에 부담을 덜하도록 했습니다. <br/>
● 서버에 Swagger를 적용함으로써 postman, jest 및 클라이언트 등을 없이 RESTful API를 문서화하여 테스트할 수 있도록 구현했습니다. <br/>
● Request DTO에 Nest.js에서 제공한 ValidationPipe를 적용시켜서 서버에 유효성 검사할 수 있도록 구현했습니다.

## 주요 기능 및 페이지
### 1. 로그인
<p align="center"><img src="https://github.com/seongchangkim/tic-tac-toe-web/assets/74657556/dbaa54f0-68fa-4561-af6d-cb130dbe52b4"></p>
<p align="center">이메일 또는 비밀번호 불일치 시 로그인</p>

<p align="center"><img src="https://github.com/seongchangkim/tic-tac-toe-web/assets/74657556/6b60e2c3-8dca-4358-ab58-b764af2052dd"></p>
<p align="center">로그인 성공</p>

<p align="center"><img src="https://github.com/seongchangkim/tic-tac-toe-web/assets/74657556/0fd1f2ab-2f97-4ec4-aec9-ab70b048a502"></p>
<p align="center">로그인 유효성 검사</p>

<br/>
- 로그인 페이지에서 이메일과 비밀번호를 입력하여 로그인 API를 POST 방식으로 호출하여 입력한 이메일과 비밀번호 값을 들고 서버에 request해서 작동한 다음에 DB에서 이메일로 일치한 데이터를 조회하고 비밀번호를 암호화하여 DB에서 암호화된 비밀번호가 있는지 조회합니다. 만약 DB에서 이메일과 비밀번호가 둘 다 일치한 DB가 있으면 로그인 성공되어 홈 화면으로 이동합니다. 그렇지 않으면 비밀번호 또는 이메일이 일치하지 않는 알림창을 띄우도록 설정합니다. 그리고 로그인 입력창에 유효성 검사를 적용했습니다.

### 2. 회원가입
<p align="center"><img src="https://github.com/seongchangkim/tic-tac-toe-web/assets/74657556/16abc726-bed4-4146-a05d-bdbef49848f9" /></p>
<p align="center">회원가입 성공</p>

<p align="center"><img src="https://github.com/seongchangkim/tic-tac-toe-web/assets/74657556/95f2b30d-1309-48b4-8b97-884f18f78633" /></p>
<p align="center">회원가입 유효성 검사</p>

<br/>
- 로그인 페이지에서 회원가입 부분을 누르면 회원가입 페이지가 이동되는데 회원정보를 입력하여 회원가입 버튼을 클릭하면 회원가입 API를 POST 방식으로 호출하여 입력한 회원정보를 들고 서버에 request한 뒤에 해당 회원정보를 바탕으로 회원 데이터가 추가되고 서버에서 response 값을 받아서 회원가입이 성공하면 로그인 페이지로 이동합니다. 그리고 회원가입 입력창에 유효성 검사를 적용했습니다.

### 3. 로그아웃
<p align="center"><img src="https://github.com/seongchangkim/tic-tac-toe-web/assets/74657556/36c9dce0-941a-4d7a-89af-3f89f0cbb378" /></p>

<br/>
- 프로필 이미지를 클릭한 뒤에 로그아웃 부분에 클릭하면 웹 클라이언트에서 x_auth 토큰에 대한 쿠키를 삭제하면서 회원 상태 저장소를 빈 객체로 초기화시키고 프로필 이미지 대신 로그인 버튼으로 렌더링됩니다.

### 4. 소셜 로그인(카카오, 구글) 
1). 카카오 로그인
<p align="center"><img src="https://github.com/seongchangkim/tic-tac-toe-web/assets/74657556/e37d39c3-de01-4d1a-811f-c47978324f66" /></p>
<p align="center">카카오 로그인</p>

- 로그인 페이지에서 카카오 로그인을 누르면 소셜 로그인 로딩 페이지로 리다이렉트하면서 API(카카오 외부 API)를 호출한 뒤 카카오 토큰을 얻어서 카카오 프로필 정보 가져오기 API(카카오 외부 API)를 호출하여 카카오 프로필 정보를 가져와서 소셜 로그인 API에 request 값으로 보냅니다. 서버에서 소셜 로그인 계정 존재 여부 확인한 다음에 DB에서 소셜 로그인 회원 계정이 존재하는지 확인합니다. 소셜 로그인 회원이 존재하면 로그인된 회원에 대한 토큰을 등록하고 해당 회원에 대한 정보를 response값을 받아서 해당 카카오 계정으로 로그인하여 홈 화면으로 이동합니다.
<br/><br/>

2). 구글 로그인
<p align="center"><img src="https://github.com/seongchangkim/tic-tac-toe-web/assets/74657556/717a078b-326c-481c-9e6f-ba5520f9df74" /></p>
<p align="center">구글 로그인</p>

- 로그인 페이지에서 구글 로그인을 누르면 소셜 로그인 로딩 페이지로 리다이렉트하면서 구글 토큰 가져오기 API(구글 외부 API)를 호출한 뒤 구글 토큰을 얻어서 구글 프로필 정보 가져오기 API(구글 외부 API)를 호출하여 구글 프로필 정보를 가져와서 소셜 로그인 API를 에 request 값으로 보냅니다. 서버에서 소셜 로그인 계정 존재 여부 확인한 다음에 DB에서 소셜 로그인 회원 계정이 존재하는지 확인합니다. 소셜 로그인 회원이 존재하면 로그인된 회원에 대한 토큰을 등록하고 해당 회원에 대한 정보를 response값을 받아서 해당 구글 계정으로 로그인하여 홈 화면으로 이동합니다.

### 5. 회원 목록
<p align="center"><img src="https://github.com/seongchangkim/tic-tac-toe-web/assets/74657556/f48b798b-e721-49c4-83e9-a6092f2fe6af" /></p>
<p align="center">회원 목록(feat. 페이징 처리 및 검색 기능)</p>

1). 회원 목록 : 관리자 회원으로 로그인하면 홈 화면에서 프로필 이미지를 클릭하면 관리자 페이지 버튼이 있는데 그것을 클릭하면 회원 목록 페이지로 이동합니다. 그리고 회원 목록 페이지를 렌더링하는 동안에 회원 목록 api를 호출하여 서버로부터 response 값을 받아서 페이지 처리에 필요한 값이나 회원 목록 데이터를 받아서 회원 목록 페이지에 렌더링합니다.<br /><br />
2). 페이지 처리 : 맨 밑에 페이지 처리 관련 UI가 있는데 회원 목록 개수에 따라 페이지 수를 렌더링했습니다. 그중에서 <(이전 페이지) 누르면 이전 페이지로 이동하면서 이전 페이지에 대한 response 값을 받으면서 회원 목록 페이지를 리렌더링을 하고 >(다음 페이지)로 누르면 다음 페이지에 대한 response 값을 받으면서 회원 목록 페이지를 리렌더링을 합니다. 그리고 해당 페이지를 누르면 해당 페이지에 대한 response 값을 받으면서 회원 목록 페이지를 리렌더링을 합니다. 그리고 처음 페이지로 이동하면 이전 페이지 아이콘이 사라지고 맨 마지막 페이지로 이동하면 다음 페이지 아이콘이 사라지도록 설정했습니다.<br /><br />
3). 검색 기능 : 맨 오른쪽에 검색 UI가 있는데 검색 카테고리를 고르고 검색어를 입력하면 회원 목록 api를 호출하여 그 검색 카테고리에 대한 데이터를 검색어와 비슷한 단어를 조회하는 다음에 웹 클라이언트에 reponse 값으로 페이지 처리에 필요한 값이나 회원 목록 데이터를 받아서 회원 목록 페이지에 리렌더링합니다.

### 6. 회원 상세보기/수정/삭제
<p align="center"><img src="https://github.com/seongchangkim/tic-tac-toe-web/assets/74657556/714bd832-d4da-4d3f-88e2-6b294a62e225" /></p>
<p align="center">회원 상세보기</p>

<p align="center"><img src="https://github.com/seongchangkim/tic-tac-toe-web/assets/74657556/bee8709b-eb60-4396-b9f2-cb43d494b3c3" /></p>
<p align="center">회원 수정(프로필 이미지 수정 없이)</p>

<p align="center"><img src="https://github.com/seongchangkim/tic-tac-toe-web/assets/74657556/30a917fd-d8de-476f-bb3e-156c12f14442" /></p>
<p align="center">회원 수정(프로필 이미지 수정)</p>

<p align="center"><img src="https://github.com/seongchangkim/tic-tac-toe-web/assets/74657556/78d79314-6637-425e-a236-393313c1da7d" /></p>
<p align="center">회원 삭제</p>

<br/>
1). 회원 상세보기 : 회원 목록 페이지에서 해당 회원 이름을 클릭하면 회원 상세보기 웹 페이지에 이동하면서 회원 상세보기 API를 호출한 뒤에 렌더링합니다. <br /><br />
2). 회원 수정 : 회원 상세보기 페이지에서 수정하고자 프로필 이미지 경로, 이름, 전화번호 및 회원 권한을 수정하여 수정 버튼을 클릭하면 회원 수정 API를 호출하여 수정하고자 프로필 이미지 경로, 이름, 전화번호 및 회원 권한을 request 값으로 들고 서버에 요청한 뒤에 DB에서 해당 회원을 조회해서 조회된 회원 데이터에 수정하고자 정보들로 수정하고 last_modified_at 칼럼에 해당 API를 호출했던 시점으로 수정됩니다. 그다음에 회원 수정이 성공하면 회원 수정 알림창이 뜨고 회원 수정 알림창에 확인 버튼을 누르면 회원 상세보기 페이지에서 리렌더링됩니다. <br /><br />
3). 회원 삭제 : 회원 상세보기 페이지에서 삭제를 누르면 회원 탈퇴 API를 호출함을 통해 request를 받고 DB에서 해당 회원 id로 조회하여 해당 회원과 일치하면 조회된 회원 데이터를 삭제되어 회원 삭제 처리가 성공하면 회원 삭제 알림창을 띄우고 회원 삭제 알림창에서 확인 버튼을 클릭하면 이전 페이지로 이동됩니다.

### 7. 관리자 페이지에서 홈 페이지 이동
<p align="center"><img src="https://github.com/seongchangkim/tic-tac-toe-web/assets/74657556/aa3cbd8e-7cd2-40bb-8eb3-d15ce267cee1" /></p>
<p align="center">홈 페이지 이동</p>
<br/>

- 관리자 페이지에서 홈 페이지 부분에 클릭하면 홈 페이지로 이동합니다.

### 8. 틱택토 게임(컴퓨터와 대결)
<p align="center"><img src="https://github.com/seongchangkim/tic-tac-toe-web/assets/74657556/648f71f7-e42e-43f7-b578-19431ba917b4" /></p>
<p align="center">틱택토 게임(컴퓨터와 대결)</p>
<br/>

- 홈 페이지에서 시작 버튼을 누르면 로그인 여부와 관계 없이 컴퓨터과 틱택토 게임 대결할 수 있습니다. 만약 먼저 연속 3개이면 승리 알림창이 띄우고 그렇지 않으면 무승부 알림창이 띄웁니다. 그리고 다시 시작 버튼을 누르면 다시 시작할 수 있습니다.



