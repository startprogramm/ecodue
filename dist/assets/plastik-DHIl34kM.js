import{d as c,g as y,a as u}from"./auth-aIv_B0Df.js";/* empty css                    */async function g(e){const{data:t,error:n}=await c.from("comments").select(`
      *,
      profiles:user_id (
        full_name,
        avatar_url
      )
    `).eq("lesson_id",e).order("created_at",{ascending:!1});if(n)throw n;return t}async function p(e,t,n){const{data:l,error:s}=await c.from("comments").insert([{lesson_id:e,user_id:t,content:n}]).select().maybeSingle();if(s)throw s;return l}const i="plastik-ifloslanish";let m=null;async function f(){try{if(m=await y(),m){const e=await u(m.id);document.getElementById("logged-out-view").style.display="none",document.getElementById("logged-in-view").style.display="block",e&&(document.getElementById("user-name").textContent=e.full_name||m.email),document.getElementById("comment-form-container").style.display="block",document.getElementById("login-prompt").style.display="none",await d()}else document.getElementById("logged-out-view").style.display="block",document.getElementById("logged-in-view").style.display="none",document.getElementById("comment-form-container").style.display="none",document.getElementById("login-prompt").style.display="block"}catch(e){console.error("Failed to load page:",e)}}async function d(){try{const e=await g(i),t=document.getElementById("comments-list");if(!e||e.length===0){t.innerHTML='<p style="padding: 1rem; color: #666;">No comments yet. Be the first to comment!</p>';return}t.innerHTML=e.map(n=>{var a;const l=((a=n.profiles)==null?void 0:a.full_name)||"Anonymous",s=new Date(n.created_at).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"});return`
        <div style="padding: 1.5rem; border-bottom: 1px solid #eee;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
            <strong style="color: #2a8f3a;">${l}</strong>
            <span style="color: #999; font-size: 0.9rem;">${s}</span>
          </div>
          <p style="color: #333;">${E(n.content)}</p>
        </div>
      `}).join("")}catch(e){console.error("Failed to load comments:",e),document.getElementById("comments-list").innerHTML='<p style="padding: 1rem; color: #dc3545;">Failed to load comments.</p>'}}function E(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}const r=document.getElementById("comment-form"),o=document.getElementById("comment-msg");r&&r.addEventListener("submit",async e=>{e.preventDefault(),o.textContent="";const t=document.getElementById("comment-content").value.trim();if(!t){o.textContent="Please enter a comment.";return}if(!m){o.textContent="Please log in to post comments.";return}try{await p(i,m.id,t),document.getElementById("comment-content").value="",o.style.color="#2a8f3a",o.textContent="Comment posted successfully!",await d(),setTimeout(()=>{o.textContent=""},3e3)}catch(n){o.textContent=n.message||"Failed to post comment."}});f();
