import { jsx as h } from "react/jsx-runtime";
import { createContext as v, useState as s, useContext as C } from "react";
import { postData as D } from "./hooks/useFetchAPI.js";
const c = v({
  user: {},
  isLoggedIn: !1,
  token: null,
  message: "",
  loginUser: () => {
  },
  login: () => {
  },
  logout: () => {
  }
}), T = ({ children: g }) => {
  const [i, n] = s({}), [u, r] = s(!1), [m, a] = s(null), [k, f] = s(""), I = async (t, e, p = 12) => {
    try {
      const o = await D(
        t,
        e
      ), { userId: x, token: y } = o, d = Date.now() + p * 60 * 60 * 1e3;
      localStorage.setItem(
        "token",
        JSON.stringify({ userId: x, token: y, expiryTime: d })
      ), l();
    } catch (o) {
      console.error("Error:", o.message), f(o.message);
    }
  }, l = () => {
    if (localStorage.getItem("token")) {
      const t = localStorage.getItem("token"), e = t ? JSON.parse(t) : null;
      n(e), r(!0), a(e.token), Date.now() > e.expiryTime && (localStorage.removeItem("token"), r(!1), a(null), n({}));
    }
  }, S = () => {
    localStorage.removeItem("token"), r(!1), a(""), n({});
  };
  return /* @__PURE__ */ h(
    c.Provider,
    {
      value: {
        user: i,
        isLoggedIn: u,
        token: m,
        message: k,
        loginUser: I,
        login: l,
        logout: S
      },
      children: g
    }
  );
}, U = () => C(c);
export {
  T as ReactAuthify,
  U as useAuthContext
};
