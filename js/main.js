 document.getElementById('bookmarkForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('bookmarkName').value;
    let url = document.getElementById('bookmarkURL').value;

    if (name && url) {
      if (validateURL(url)) {
        addBookmark(name, url);
        document.getElementById('bookmarkForm').reset();
        document.getElementById('error-message').style.display = 'none';
      } else {
        document.getElementById('error-message').textContent = 'Please enter a valid URL.';
        document.getElementById('error-message').style.display = 'block';
      }
    }
  });

  function validateURL(url) {
    // Add protocol if missing
    if (!/^https?:\/\//i.test(url)) {
      url = 'https://' + url;
    }
    // Validate URL with a simple pattern
    const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(url);
  }

  function addBookmark(name, url) {
    const bookmarksList = document.getElementById('bookmarksList');
    
    const tr = document.createElement('tr');
    
    const indexTd = document.createElement('td');
    indexTd.textContent = bookmarksList.children.length + 1;
    
    const nameTd = document.createElement('td');
    nameTd.textContent = name;
    
    const visitTd = document.createElement('td');
    const visitBtn = document.createElement('a');
    visitBtn.href = url.startsWith('http') ? url : `https://${url}`;
    visitBtn.target = '_blank';
    visitBtn.className = 'btn btn-info btn-sm';
    visitBtn.innerHTML = '<i class="fas fa-eye"></i> Visit';

    const deleteTd = document.createElement('td');
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-danger btn-sm';
    deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i> Delete';
    deleteBtn.onclick = function() {
      bookmarksList.removeChild(tr);
      updateIndex();
    };
    
    visitTd.appendChild(visitBtn);
    deleteTd.appendChild(deleteBtn);
    
    tr.appendChild(indexTd);
    tr.appendChild(nameTd);
    tr.appendChild(visitTd);
    tr.appendChild(deleteTd);
    
    bookmarksList.appendChild(tr);
  }

  function updateIndex() {
    const bookmarksList = document.getElementById('bookmarksList');
    for (let i = 0; i < bookmarksList.children.length; i++) {
      bookmarksList.children[i].firstChild.textContent = i + 1;
    }
  }