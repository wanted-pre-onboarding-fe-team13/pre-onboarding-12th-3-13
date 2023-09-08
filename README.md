# 원티드 프리온보딩 3주차 - 한국임상정보 검색 영역 클론 코딩

## 📚 과제

### 한국임상정보 웹사이트의 검색영역 클론 코딩

#### 과제1. 검색창 구현

- 키보드만으로 추천 검색어들로 이동 가능하도록 구현

#### 과제2. 검색어 추천 기능 구현

- 사용자의 입력값에 따른 추천 검색어 제공
- API 호출 횟수를 줄이는 전략 수립 및 실행

#### 과제3. 캐싱 기능 구현

- API 호출별로 로컬 캐싱 구현
- 캐싱 기능을 제공하는 라이브러리 사용 금지(React-Query 등)

---

## 사용한 기술 스택

<img src="https://shields.io/badge/TypeScript-3178C6?logo=TypeScript&logoColor=FFF&style=flat-square"/>
<img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white"/>
<img src="https://img.shields.io/badge/React Router-CA4245?style=flat-square&logo=React Router&logoColor=white">
<img src="https://img.shields.io/badge/Recoil-3578E5?style=flat-square&logo=Recoil&logoColor=white"/>
<img src="https://img.shields.io/badge/Styled Components-DB7093?style=flat-square&logo=Styled components&logoColor=white"/>
<img src="https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=Vite&logoColor=white"/>

</br>

---

## 🎬 페이지 미리보기 & 구현영상

구현영상은 배포 링크로 대체합니다.
<br/>
https://pre-onboarding-12th-3-13.vercel.app/

#### 페이지 미리보기
<img src="https://github.com/wanted-pre-onboarding-fe-team13/pre-onboarding-12th-3-13/assets/122191856/3e2cf675-b680-43d6-8a28-49ced12cf06c" alt="img" width="500px"/>


---

## 🛠️ 설계 및 구현 설명

### 1. 검색창 구현

#### 설계 및 개발 방향

#### 주요 구성 및 동작

### 2. 검색어 추천 기능

#### 설계 및 개발 방향
input의 값이 변할때 마다 api가 호출되는 것을 막기 위해 Debounce를 수행하는 useDebounce 훅을 추가하였습니다. 
<br/> 이를 통해 이벤트 오버클럭으로 인한 리소스 사용량의 증가와 서버의 과부하를 예방하고자 하였습니다.

#### 주요 구성 및 동작
- src/hooks/useDebounce.ts
  - callback : 사용자의 키보드 이벤트가 멈춘 후 실행 될 함수를 정의합니다
  - delay : 사용자의 이벤트가 멈춘 것을 감지 할 시간을 정의합니다.
  - trigger : 변경을 감지하여 useDebounce 훅이 실행 될 의존성을 설정합니다.
- src/components/keywordList/RecommendList.tsx
  - getResultList: 검색어 키워드를 쿼리스트링으로 전달하여 서버에서 데이터를 받아오고, 이를 recommendList에 저장하여 사용자에게 저장합니다.
  - useDebounce : searchText의 변화를 감지하여 사용자의 동작이 150ms 이상 멈추면 콜백함수로 전달한 getResultList를 실행하여 api를 호출합니다.

### 3. 캐싱 기능

#### 설계 및 개발 방향

#### 주요 구성 및 동작
