# 원티드 프리온보딩 3주차 - 한국임상정보 검색창 클론 코딩

## 📚 과제

### Facebook의 React 레파지토리의 이슈 목록과 상세 내용을 확인하는 웹 사이트 구축

#### 과제1. 이슈 목록 화면

- 이슈 목록 가져오기 API 활용
- open 상태의 이슈 중 코멘트가 많은 순으로 정렬
- 각 행에는 ‘이슈번호, 이슈제목, 작성자, 작성일, 코멘트수’를 표시
- 다섯번째 셀마다 광고 이미지 출력
- 화면을 아래로 스크롤 할 시 이슈 목록 추가 로딩(인피니티 스크롤)

#### 과제2. 이슈 상세 화면

- 이슈의 상세 내용 표시
- ‘이슈번호, 이슈제목, 작성자, 작성일, 코멘트 수, 작성자 프로필 이미지, 본문' 표시

#### 과제3. 공통 헤더

- 두 페이지는 공통 헤더를 공유합니다.
- 헤더에는 Organization Name / Repository Name이 표시됩니다.

---

## 사용한 기술 스택

<img src="https://shields.io/badge/TypeScript-3178C6?logo=TypeScript&logoColor=FFF&style=flat-square"/> <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white"/> <img src="https://img.shields.io/badge/React Router-CA4245?style=flat-square&logo=React Router&logoColor=white"> <img src="https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=flat-square&logo=Tailwind%20CSS&logoColor=white"/> <img src="https://img.shields.io/badge/Octokit-2F93E0?style=flat-square&logo=Octopus-Deploy&logoColor=white"/>
</br>

---

## 🎬 페이지 미리보기 & 구현영상

구현영상은 배포 링크로 대체합니다.
https://pre-onboarding-12th-2-13-git-develop-patataco.vercel.app/issues

### 메인 페이지 (이슈 목록)

<img src="./src/assets/mainpage.png" width="400">

### 상세 페이지 (이슈에 대한 상세한 정보)

<img src="./src/assets/issuepage.png" width="400">

## 💭 설계 방향

#### 설계 목표

- 에러 핸들링, Suspense, Loader를 적용
- 무한 스크롤 구현 방식
- 데이터 전역 상태 관리

#### 구현 방법

이러한 기준을 바탕으로 선정된 Best Practice는 크게 3가지 입니다.

1. 에러바운더리를 통한 페이지 별 에러 처리
2. Intersection observer API를 사용한 무한 스크롤 구현
3. Context API의 사용하여 데이터 전역 상태 관리

## 🛠️ 설계 및 구현 설명

### 1. 무한스크롤의 페이지 별 비동기 동작 처리

#### 설계 및 개발 방향

API 호출과 같은 비동기 통신에 대한 로딩과 에러 상태, 데이터를 효율적으로 처리하고 사용자에게 적절한 화면과 가이드를 제공하는 것이 주요 목표였습니다.

- Error Boundary를 사용하여 API 호출에 대한 에러를 한 곳에서 선언적으로 처리
- suspense를 대체할 수 있는 fetcher 컴포넌트를 사용하여 API 호출 상태에 대한 책임을 위임

특히, API 요청 단위에 맞춰 최대한 작은 범위에서 로딩과 에러 상태를 표시하여 더 나은 사용자 경험을 제공하고자 하였습니다. 이에 따라 설계한 구조는 아래와 같습니다.

```javascript
<ApiErrorBoundary> // 단일 페이지의 API 동작 중 발생한 에러를 처리
  <ApiFetcher> // 단일 페이지의 API 호출을 담당
    <ListPerPage> // 각 페이지의 데이터를 화면에 렌더링하는 UI
  <ApiFetcher />
<ApiErrorBoundary />
```

#### 주요 구성 및 동작

- IssueListFetcher.tsx

  - 하위 컴포넌트를 렌더링하기 위한 데이터를 요청하고, 그에 따라 loading 및 error에 대한 정보를 가지고 있습니다.
  - 데이터의 요청 상태가 loading일 경우 로딩 UI를 반환하고, 에러가 발생한 경우 ApiErrorBoundary에서 에러를 catch할 수 있도록 에러를 throw합니다.

- ApiErrorBoundary (src/boundary/ApiErrorBoundary.tsx)

  - 하위 컴포넌트에서 throw한 에러를 catch하여 API 단위에서 처리할 수 있는 단위인지, 전역에서 처리해야하는 에러인지 구별합니다. API 단위에서 처리할 수 있는 에러라면 Fallback UI를 반환하고, 그렇지 않다면 GlobalErrorBoundary에서 catch하여 처리할 수 있도록 rethrow해줍니다.

### 2. Intersection observer API를 사용한 무한 스크롤 구현

#### 설계 및 개발 방향

reflow 발생으로 성능 저하의 문제가 있는 scroll 이벤트 대신 Intersection Observer API를 사용하여 리스트 최하단의 요소가 화면 안에 감지됐을 때 다음 페이지를 요청할 수 있도록 했습니다.

### 3. Context API의 사용하여 데이터 전역 상태 관리

#### 설계 및 개발 방향

사용자의 데이터를 효율적으로 관리하며, 사용자에게 서버와 동일한 데이터를 보장하는 것이 주요 목표였습니다.

- Context API를 통한 비즈니스 로직 분리

  - 상태 및 액션의 전역 관리 : 사용자의 데이터와 Issue 관련한 동작들을 전역적으로 관리하여 데이터와 관련 로직을 쉽게 재사용하고 변경할 수 있습니다.

#### 주요 구성 및 동작

- IssueListProvider (src/context/IssueListProvider.tsx)

  - IssueList를 구성하는 데이터를 전역에서 관리하여 각 페이지에 제공했습니다.
  - 각 페이지를 fetch 할 때마다 다음 페이지의 데이터가 있는지에 대한 값을 저장하여, 다음 페이지의 데이터가 없을 경우 무한스크롤을 처리하는 커스텀 훅에서 다음 페이지를 요청하지 않도록 했습니다.
