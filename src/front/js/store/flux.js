const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            message: null,
            token: null,
            demo: [
                { title: "FIRST", background: "white", initial: "white" },
                { title: "SECOND", background: "white", initial: "white" }
            ]
        },
        actions: {
            getMessage: async () => {
                try {
                    const resp = await fetch(`${process.env.BACKEND_URL}/api/hello`);
                    const data = await resp.json();
                    setStore({ message: data.message });
                    return data;
                } catch (error) {
                    console.log("Error loading message from backend", error);
                }
            },

            syncToken: () => {
                const token = localStorage.getItem('token');
                if (token) setStore({ token });
            },

            login: async (email, password) => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/login`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email, password })
                    });
                    if (response.ok) {
                        const data = await response.json();
                        localStorage.setItem('token', data.token);
                        setStore({ token: data.token });
                        return true;
                    } else {
                        console.log('Login failed');
                        return false;
                    }
                } catch (error) {
                    console.log("Login error", error);
                    return false;
                }
            },

            logout: () => {
                localStorage.removeItem('token');
                setStore({ token: null });
            }
        }
    };
};

export default getState;
