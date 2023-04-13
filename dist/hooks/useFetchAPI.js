const s = async (e, a, n) => {
  const t = await fetch(e, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${n}`
    },
    body: JSON.stringify(a)
  }), o = await t.json();
  if (!t.ok)
    throw new Error(o.message);
  return o;
};
export {
  s as postData
};
