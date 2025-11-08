// admin-main.js
import { auth, db } from './firebase.js';
import { signOut } from 'https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js';
import { collection, getDocs, query, orderBy, updateDoc, doc } from 'https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js';

const ADMIN_EMAIL = 'helpjobsure@gmail.com';

const studentsBody = document.getElementById('studentsBody');
const exportBtn = document.getElementById('exportBtn');
const signOutBtn = document.getElementById('signOutBtn');
const searchInput = document.getElementById('searchInput');
const filterCourse = document.getElementById('filterCourse');
const filterStatus = document.getElementById('filterStatus');

let students = [];

// ensure only admin can view
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js';
onAuthStateChanged(auth, async (u) => {
  if (!u || u.email !== ADMIN_EMAIL) {
    alert('Not authorized — please sign in as admin.');
    window.location.href = 'admin-login.html';
    return;
  }
  await loadStudents();
});

signOutBtn.addEventListener('click', async ()=>{
  await signOut(auth);
  window.location.href = 'admin-login.html';
});

async function loadStudents(){
  const q = query(collection(db, 'students'), orderBy('name'));
  const snap = await getDocs(q);
  students = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  buildCourseFilter();
  renderTable(students);
}

function buildCourseFilter(){
  const courses = Array.from(new Set(students.map(s => s.itCourse || s.course || '').filter(Boolean)));
  filterCourse.innerHTML = '<option value="">All Courses</option>' + courses.map(c=>`<option value="${c}">${c}</option>`).join('');
}

function renderTable(list){
  studentsBody.innerHTML = list.map(s => `
    <tr class="border-b">
      <td class="p-2"><img src="${s.photo||''}" alt="photo" class="w-12 h-12 object-cover rounded"/></td>
      <td class="p-2">${s.name||''}</td>
      <td class="p-2">${s.email||''}</td>
      <td class="p-2">${s.mobile1||''}</td>
      <td class="p-2">${s.gradDegree||''} / ${s.gradYear||''}</td>
      <td class="p-2">${s.city||''}</td>
      <td class="p-2">${s.itCourse||s.course||''}</td>
      <td class="p-2">${statusBadge(s.status||'Pending')}</td>
      <td class="p-2">
        <button data-id="${s.id}" class="approveBtn bg-green-500 text-white px-2 py-1 rounded mr-1">Approve</button>
        <a href="${s.cv||'#'}" target="_blank" class="bg-blue-600 text-white px-2 py-1 rounded mr-1">CV</a>
        <button data-id="${s.id}" class="viewBtn bg-slate-200 px-2 py-1 rounded">View</button>
      </td>
    </tr>
  `).join('');

  // wire buttons
  document.querySelectorAll('.approveBtn').forEach(b=> b.addEventListener('click', onApprove));
  document.querySelectorAll('.viewBtn').forEach(b=> b.addEventListener('click', onView));
}

function statusBadge(st){
  if (st === 'Approved') return `<span class="px-2 py-1 rounded bg-green-100 text-green-800">Approved</span>`;
  if (st === 'Rejected') return `<span class="px-2 py-1 rounded bg-red-100 text-red-800">Rejected</span>`;
  return `<span class="px-2 py-1 rounded bg-yellow-100 text-yellow-800">Pending</span>`;
}

async function onApprove(e){
  const id = e.currentTarget.dataset.id;
  const refDoc = doc(db, 'students', id);
  await updateDoc(refDoc, { status: 'Approved' });
  // update local and rerender
  students = students.map(s => s.id === id ? { ...s, status: 'Approved' } : s);
  applyFiltersAndRender();
}

function onView(e){
  const id = e.currentTarget.dataset.id;
  const s = students.find(x => x.id === id);
  if(!s) return;
  const content = `
    Name: ${s.name}\nEmail: ${s.email}\nMobile: ${s.mobile1}\nCity: ${s.city}\nDegree: ${s.gradDegree} / ${s.gradYear}\nCourse: ${s.itCourse || s.course}\nCV: ${s.cv}\nPhoto: ${s.photo}\n`;
  alert(content);
}

// Filters
searchInput.addEventListener('input', applyFiltersAndRender);
filterCourse.addEventListener('change', applyFiltersAndRender);
filterStatus.addEventListener('change', applyFiltersAndRender);

function applyFiltersAndRender(){
  const q = searchInput.value.trim().toLowerCase();
  const course = filterCourse.value;
  const status = filterStatus.value;
  let list = students.filter(s => {
    const text = `${s.name||''} ${s.email||''} ${s.mobile1||''}`.toLowerCase();
    if (q && !text.includes(q)) return false;
    if (course && ((s.itCourse || s.course || '') !== course)) return false;
    if (status && (s.status || 'Pending') !== status) return false;
    return true;
  });
  renderTable(list);
}

// Export (SheetJS)
exportBtn.addEventListener('click', ()=>{
  const rows = students.map(s => ({
    'Full Name': s.name || '',
    'Email': s.email || '',
    'Mobile': s.mobile1 || '',
    'Degree / Year': `${s.gradDegree||''} / ${s.gradYear||''}`,
    'City': s.city || '',
    'Course': s.itCourse || s.course || '',
    'Status': s.status || 'Pending'
  }));
  const ws = XLSX.utils.json_to_sheet(rows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Students');
  XLSX.writeFile(wb, 'jobsure_students.xlsx');
});
