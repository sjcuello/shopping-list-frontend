# Shopping List Frontend 

This is a simple shopping list app that allows users to add, edit, and delete items from their shopping list.
Design based on this [figma](https://www.figma.com/file/FP6nTXF1nqA9J5QFk0ieHi/DEMO-UI-TEST?node-id=0%3A1).

## How to run the app
1. Clone this repository
    ```bash
    git clone https://github.com/sjcuello/shopping-list-frontend.git
    ```
2. Install dependencies
    ```bash
    pnpm install
    ```
3. Copy the `.env.example` file and rename it to `.env`:
    ```bash
    cp .env.example .env
    ```

4. To start the development server
    ```bash
    pnpm run dev
    ```
5. Open `http://localhost:5173` in your browser

### Routes
- `/` - Home page
- `/trash-bin` - Trash bin
- `/something-else` - Error page

## Technologies Used
- React
- TypeScript
- Vite
- Redux
- Material-UI
- React-Router
- React-Redux
- Redux-Thunk
- CSS Modules
- Yup
