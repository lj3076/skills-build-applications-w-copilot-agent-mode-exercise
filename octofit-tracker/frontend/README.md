# OctoFit Tracker 프런트엔드

React 19 및 Vite로 만든 프레젠테이션 계층입니다. 개발 서버는 포트 `5173`에서 실행됩니다.

## API 기본 URL 설정

Codespaces에서는 `octofit-tracker/frontend/.env.local` 파일을 만들고 Codespace 이름을 설정하세요.

```env
VITE_CODESPACE_NAME=your-codespace-name
```

Vite는 `VITE_` 접두사가 있는 변수를 클라이언트 앱에 제공합니다. 이름을 설정하면 프런트엔드는 `https://<VITE_CODESPACE_NAME>-8000.app.github.dev/api`를 사용합니다. 변수가 없으면 로컬 개발용 `http://localhost:8000/api`로 대체됩니다.

## 실행

리포지토리 루트에서 다음 명령을 실행하세요.

```bash
npm run dev --prefix octofit-tracker/frontend
```
