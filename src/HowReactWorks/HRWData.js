export const content = [
  {
    summary: "React is a library for building UIs",
    details:
         "React 는 웹 프레임워크로, 자바스크립트 라이브러리의 하나로서 사용자 인터페이스를 만들기 위해 사용된다. React 는 facebook에서 제공해주는 프론트엔드 라이브러리라고 볼 수 있습니다. 싱글 페이지 애플리케이션이나 모바일 애플리케이션의 개발 시 토대로 사용될 수 있습니다.",
  },
  {
    summary: "리액트 상태 관리 가이드",
    details:
         "리액트 상태 관리를 어떻게 하냐에 따라 의미 없는 리렌더 등 성능 이슈가 생길 수 있고 어떤 상태 라이브러리를 쓰며 어떤 구조로 상태를 설계해서 다루냐에 따라서 유지보수 관점에서 코드의 라이프 사이클이 크게 짧아질 수도 길어 질 수도 있다. 상태 설계는 만드는 개발자마다 중요하게 생각하는 지점이 갈릴 수 도 있고 한번 설계되면 프로젝트를 새로 만들지 않는 이상 고치기가 쉽지 않아서 깊은 고려를 하고 시작해야 되는 부분이다. 전역 상태 라이브러리로 Redux가 여전히 대세로 쓰이고 있고 많은 프로젝트에서 전역 상태가 무분별하게 사용되고 있다. 점차 전역 상태 라이브러리를 안쓰는 게 좋다는 흐름이 생기고 있고 리액트 팀에서는 Recoil을 만들어서 기존의 전역 상태 라이브러리를 대체 하려고 하고 있다. ",
  },
  {
    summary: "We can think of props as the component API",
    details:
         "React components use props to communicate with each other. Every parent component can pass some information to its child components by giving them props. Props might remind you of HTML attributes, but you can pass any JavaScript value through them, including objects, arrays, and functions." +
         "",
  },
  {
    summary: "React reconciliation",
    details:
         "리액트는 컴포넌트에서 prop이나 state가 변경될 때, 직전에 렌더링된 요소(element)와 새로 반환된 요소를 비교하여 실제 DOM을 업데이트 할지 말지 결정해야 한다. 이때 두 element가 일치하지 않으면 리액트는 새로운 요소로 DOM을 업데이트 하는데, 이러한 프로세스를 reconciliation이라고 한다." +
         "",
  },
];

