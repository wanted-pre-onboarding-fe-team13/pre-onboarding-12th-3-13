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

사용자 경험(UX)을 개선하기 위해 다양한 Event Handler를 활용하여 추천 검색어와 최근 검색어를 손쉽게 선택하고 빠르게 검색할 수 있도록 도와줍니다.

#### 주요 구성 및 동작

- src/components/SearchContainer/SearchContainer.tsx, TextInput.tsx
  - 검색 Input과 관련된 사용자 Event 발생 시 실행할 Event Handler 함수가 정의되어 있습니다.
  - Focus Event Handler :
    - 검색 Input Focus 시 검색어 리스트 UI가 노출되고, Blur 시 검색어 리스트 UI가 제거됩니다.
  - Keyboard Event Handler :
    - 위, 아래 방향키 입력 시 검색어 리스트의 검색어가 활성화되어 원하는 검색어로 간편하게 이동할 수 있습니다.
    - Keyboard Event를 이용하여 검색어를 활성화 시킬 경우, 검색 Input에 해당 검색어를 반영합니다.
    - 사용자의 편의를 위해 Keyboard Event로 인해 검색 Input이 변경될 경우, 추천 검색어를 갱신하지 않습니다.
    - Enter 키를 눌러 활성화 된 검색어를 즉시 검색할 수 있습니다.

  - Change Event Handler :
    - 검색 Input의 Value가 없으면 최근 검색어가, Value가 있으면 추천 검색어가 나타납니다.
    - Change Event가 발생 시 추천 검색어가 갱신됨에 따라 검색어 활성화 상태를 초기화합니다.

- src/components/KeywordsList/KeywordListItem.tsx
  - 각각의 추천 검색어 및 최근 검색어를 나타내는 컴포넌트로, Mouse Event Handler 함수와 함께 정의되어 있습니다.
  - Mouse Event Handler :
    - 검색어에 마우스 커서를 올리면 해당 검색어가 활성화됩니다.
    - 검색어에서 마우스 커서가 벗어나면 검색어 활성화 상태가 초기화됩니다.
    - Mouse Event와 검색 Input의 Keyboard Event로 발생한 검색어 활성화 상태는 공유됩니다.

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

프로젝트에서는 로컬 스토리지(Local Storage)를 활용하여 검색 결과를 캐싱하고 관리하는 캐싱 기능을 구현하였습니다. 이를 위해 주요한 설계 및 개발 방향은 다음과 같습니다:

- LocalStorage 내부 데이터 관리: 로컬 스토리지를 사용하여 검색 결과를 캐싱하고, 이 데이터를 효율적으로 관리합니다.

- 유효 기간 설정: 각 검색 결과에 대한 유효 기간(Expiration Date)을 설정하여 만료된 데이터를 정기적으로 삭제합니다.

- 캐시 크기 관리: 로컬 스토리지의 메모리 사용을 효율적으로 관리하기 위해 캐시 크기 제한을 설정하고, 초과할 경우 가장 오래된 데이터를 제거합니다.

#### 주요 구성 및 동작

- **Main logic**: api를 호출 할 때마다, caching된 local storage를 확인 한 후 cache hit가 발생할 경우 해당 cache를 사용합니다. 만약 존재 하지않다면 새로운 cache를 설정합니다. 이때, 존재하는 cache가 maximum cache size를 초과하였을때, 가장 오래된 cache를 제거합니다.

- LocalStorageCacheManager 클래스: 검색 결과를 캐싱하고 로컬 스토리지를 관리하기 위한 클래스로서, 다음과 같은 메소드를 포함하고 있습니다:

  - set(key, value, duration): 특정 검색어에 대한 결과를 캐싱하며, 지정된 기간 동안 유지합니다.

  - get(key): 특정 검색어에 대한 캐시된 결과를 반환하며, 만료된 데이터는 자동으로 삭제됩니다.

  - has(key): 특정 검색어에 대한 캐시가 있는지 확인합니다.

  - delete(key): 특정 검색어에 대한 캐시를 삭제합니다.

  - cleanupExpiredItems(): 만료된 캐시 항목을 정리하고 삭제합니다.

  - removeOldestItem(): 가장 오래된 캐시 항목을 삭제하여 캐시 크기를 유지합니다.

- 캐시 크기 제한 설정: cacheSizeLimit 속성을 사용하여 로컬 스토리지에 저장할 수 있는 캐시의 최대 크기를 설정할 수 있습니다.
