 // بيانات الكتب
const books = [
    { code: 'BK001', title: 'كتاب الفلسفة', price: '1000', details: 'تفاصيل الكتاب الفلسفي', summary: 'هذا الكتاب يتناول أفكار الفلاسفة العظماء.', publisher: 'دار الفكر', category: 'فلسفة', place: 'دمشق', relatedBooks: ['كتاب العلوم', 'كتاب المنطق'] },
    { code: 'BK002', title: 'كتاب البرمجة', price: '1500', details: 'تفاصيل الكتاب البرمجي', summary: 'هذا الكتاب هو دليل شامل لتعلم البرمجة من الصفر.', publisher: 'مكتبة البرمجيات', category: 'تقنية', place: 'حلب', relatedBooks: ['كتاب C++', 'كتاب البرمجة بلغة بايثون'] },
    { code: 'BK003', title: 'كتاب الرياضيات', price: '2000', details: 'تفاصيل الكتاب الرياضي', summary: 'كتاب شامل لأساسيات الرياضيات الحديثة مع تطبيقات عملية.', publisher: 'مكتبة الرياضيات', category: 'رياضيات', place: 'اللاذقية', relatedBooks: ['كتاب التفاضل والتكامل', 'كتاب الجبر'] },
    { code: 'BK004', title: 'كتاب الأدب', price: '1200', details: 'تفاصيل الكتاب الأدبي', summary: 'الكتاب يناقش أشهر أعمال الأدب العربي ويستعرض تطوره.', publisher: 'دار الأدب', category: 'أدب', place: 'دمشق', relatedBooks: ['كتاب الشعر', 'كتاب الأدب العربي'] }
];

let currentBooksIndex = 0;

// وظيفة لعرض الكتب في الجدول
function loadBooks() {
    const tableBody = document.getElementById('book-table');
    for (let i = currentBooksIndex; i < currentBooksIndex + 1 && i < books.length; i++) {
        const book = books[i];
        const row = document.createElement('tr');
        row.setAttribute('id', 'book-row-' + book.code); // إضافة id فريد للصف
        row.innerHTML = `
            <td>${book.code}</td>
            <td>${book.title}</td>
            <td>${book.price} ل.س</td>
            <td><button onclick="toggleDetails('${book.code}')">إظهار التفاصيل</button></td>
            <td><input type="checkbox" class="book-select" data-code="${book.code}" /></td>
        `;
        tableBody.appendChild(row);
    }
    currentBooksIndex += 1;  // زيادة المؤشر لإضافة الكتاب التالي في المرة القادمة
}

// وظيفة لعرض المزيد من الكتب (إضافة كتاب واحد فقط عند الضغط على الزر)
function loadMoreBooks() {
    loadBooks();
}

// وظيفة لإظهار/إخفاء التفاصيل الخاصة بالكتاب
function toggleDetails(bookCode) {
    const book = books.find(b => b.code === bookCode);
    const row = document.getElementById('book-row-' + bookCode);
    
    // إذا كانت التفاصيل موجودة مسبقًا، نقوم بإخفائها
    const existingDetailsRow = row.nextElementSibling;
    if (existingDetailsRow && existingDetailsRow.classList.contains('details-row')) {
        existingDetailsRow.remove();
    } else {
        // إذا لم تكن التفاصيل موجودة، نقوم بعرضها
        const detailsRow = document.createElement('tr');
        detailsRow.classList.add('details-row');
        detailsRow.innerHTML = `
            <td colspan="5">
                <strong>الناشر:</strong> ${book.publisher} <br>
                <strong>التصنيف:</strong> ${book.category} <br>
                <strong>مكان النشر:</strong> ${book.place} <br>
                <strong>ملخص الكتاب:</strong> ${book.summary} <br>
                <strong>أهم الكتب ذات الصلة:</strong> ${book.relatedBooks.join(', ')}
            </td>
        `;
        row.parentNode.insertBefore(detailsRow, row.nextElementSibling);
    }
}

// وظيفة لإظهار النموذج بعد الضغط على متابعة
function showForm() {
    const selectedBooks = document.querySelectorAll('.book-select:checked');
    if (selectedBooks.length === 0) {
        alert('من فضلك اختر كتاباً للمتابعة');
        return;
    }

    document.getElementById('form-container').classList.remove('hidden');
}

// إضافة حدث للإرسال
document.getElementById('user-form').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('تم إرسال البيانات بنجاح');
});

// تحميل الكتب عند تحميل الصفحة
loadBooks();