import{d as a,g as d,a as m}from"./auth-aIv_B0Df.js";/* empty css              */async function u(t,o=null){let e=a.from("quiz_attempts").select("*").eq("user_id",t).order("completed_at",{ascending:!1});o&&(e=e.eq("quiz_id",o));const{data:s,error:r}=await e;if(r)throw r;return s}async function g(){try{const t=await d();if(!t){window.location.href="login.html";return}const o=await m(t.id);if(o){document.getElementById("user-greeting").textContent=`Welcome back, ${o.full_name}!`;const r=new Date(o.created_at).toLocaleDateString("en-US",{month:"short",year:"numeric"});document.getElementById("member-since").textContent=r}const e=await u(t.id);if(document.getElementById("quiz-count").textContent=e.length,e.length>0){const r=e.reduce((n,i)=>n+i.score/i.total_points*100,0)/e.length;document.getElementById("avg-score").textContent=`${Math.round(r)}%`;const l=e.slice(0,5).map(n=>{const i=new Date(n.completed_at).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"}),c=Math.round(n.score/n.total_points*100);return`
          <div class="activity-item">
            <div style="display: flex; justify-content: space-between;">
              <div>
                <strong>Quiz Attempt</strong>
                <p style="color: #666; font-size: 0.9rem;">${i}</p>
              </div>
              <div style="text-align: right;">
                <strong style="color: ${c>=70?"#2a8f3a":"#dc3545"};">${c}%</strong>
                <p style="color: #666; font-size: 0.9rem;">${n.score}/${n.total_points} points</p>
              </div>
            </div>
          </div>
        `}).join("");document.getElementById("recent-quizzes").innerHTML=l}const{count:s}=await a.from("comments").select("*",{count:"exact",head:!0}).eq("user_id",t.id);document.getElementById("comment-count").textContent=s||0}catch(t){console.error("Failed to load dashboard:",t)}}g();
