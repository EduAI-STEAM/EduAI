const API_BASE = "";

async function submitRegistration(data) {
  // 后续对接后端时，取消下方注释并配置 API_BASE
  // const res = await fetch(`${API_BASE}/register`, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(data),
  // });
  // if (!res.ok) throw new Error("报名提交失败");
  // return res.json();

  console.log("[报名数据]", data);
  await delay(600);
  return { success: true, message: "报名提交成功" };
}

async function submitFeedback(data) {
  // 后续对接后端时，取消下方注释并配置 API_BASE
  // const res = await fetch(`${API_BASE}/feedback`, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(data),
  // });
  // if (!res.ok) throw new Error("反馈提交失败");
  // return res.json();

  console.log("[反馈数据]", data);
  await delay(600);
  return { success: true, message: "反馈提交成功" };
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
