var newMemberAddBtn = document.querySelector('.addMemberBtn'),
    darkBg = document.querySelector('.dark_bg'),
    popupForm = document.querySelector('.popup'),
    crossBtn = document.querySelector('.closeBtn'),
    submitBtn = document.querySelector('.submitBtn'),
    modalTitle = document.querySelector('.modalTitle'),
    popupFooter = document.querySelector('.popupFooter'),
    imgInput = document.querySelector('.img'),
    imgHolder =document.querySelector('.imgholder'),
    form = document.querySelector('form'),
    formInputfields = document.querySelectorAll('form input'),
    uploadimg = document.querySelector("#uploadimg"),
    nim = document.getElementById("nim"),
    fName = document.getElementById("fName"),
    lName = document.getElementById("lName"),
    jk = document.getElementById("jk"),
    jurusan = document.getElementById("jurusan"),
    angkatan = document.getElementById("angkatan"),
    email = document.getElementById("email"),
    whatsapp = document.getElementById("whatsapp"),
    entries = document.querySelector('.showEntries'),
    tabSize = document.getElementById("table_size"),
    userInfo =document.querySelector(".userInfo")

    let originalData = localStorage.getItem('userProfile') ? JSON.parse(localStorage.getItem('userProfile')) : []
    let getData = [...originalData]

    let isEdit = false, editId

    var arrayLength = 0
    var tableSize = 10
    var startIndex = 1
    var endIndex = 0
    var currentIndex = 1
    var maxIndex = 0

    showInfo()

    newMemberAddBtn.addEventListener('click', ()=> {
        submitBtn.innerHTML = "Submit"
        modalTitle.innerHTML = "Fill the form"
        popupFooter.style.display = "block"
        imgInput.src ="images.png"
        darkBg.classList.add('active')
        popupForm.classList.add('active')

        
    })

    crossBtn.addEventListener('click', ()=>{
        darkBg.classList.remove('active')
        popupForm.classList.remove('active')
        form.reset()
    })

    uploadimg.onchange = function(){
        if(uploadimg.files[0].size < 1000000){
            var fileReader = new FileReader()

            fileReader.onload = function(e){
                var imgUrl = e.target.result
                imgInput.src = imgUrl
            }

            fileReader.readAsDataURL(uploadimg.files[0])
        }

        else{
            alert("Ukuran maks 1MB")
        }
    }

    function preLoadCalculations(){
        array = getData
        arrayLength = array.length
        maxIndex = (arrayLength/tableSize)

        if((arrayLength % tableSize) > 0){
            maxIndex++
        }
    }

    function displayIndexBtn(){
        preLoadCalculations()
        const pagination = document.querySelector('.pagination')

        pagination.innerHTML = ""

        pagination.innerHTML = '<button onclick="prev()" class="prev">Prev</button>'

        for(let i=1; i<=maxIndex; i++){
            pagination.innerHTML += '<button onclick=paginationBtn('+i+') index="'+i+'">'+i+'</button>'
        }

        
        pagination.innerHTML += '<button onclick="next()" class="next">Next</button>'

        highlightIndexBtn()
    }

    function highlightIndexBtn(){
        startIndex = ((currentIndex - 1)* tableSize) + 1
        endIndex = (startIndex + tableSize) - 1

        if(endIndex > arrayLength){
            endIndex = arrayLength
        }

        if(maxIndex >= 2){
            var nextBtn = document.querySelector(".next")
            nextBtn.classList.add("act")
        }
        entries.textContent = `Showing ${startIndex} to ${endIndex} of ${arrayLength} entries`

        var paginationBtns = document.querySelectorAll('.pagination button')
        paginationBtns.forEach(btn => {
            btn.classList.remove('active')
            if(btn.getAttribute('index') === currentIndex.toString()){
                btn.classList.add('active')
            }
        })
        showInfo()
    }

    function showInfo(){

        document.querySelectorAll(".studentDetails").forEach(info => info.remove())
        var tab_start = startIndex - 1
        var tab_end = endIndex

        if(getData.length > 0){
            for(var i= tab_start; i< tab_end; i++){
                var mhs = getData[i]

                if(mhs){
                    let createElement = `<tr class="studentDetails">
                    <td>${i+1}</td>
                    <td><img src="${mhs.picture}" alt="picture" width="40" height="50"></td>
                    <td>${mhs.nim}</td>
                    <td>${mhs.fName +" "+ mhs.lName}</td>
                    <td>${mhs.jk}</td>
                    <td>${mhs.jurusan}</td>
                    <td>${mhs.angkatan}</td>
                    <td>${mhs.email}</td>
                    <td>${mhs.whatsapp}</td>
                    <td>
                        <button onclick="readInfo('${mhs.picture}', '${mhs.nim}', '${mhs.fName}', '${mhs.lName}', '${mhs.jk}', '${mhs.jurusan}', '${mhs.angkatan}', '${mhs.email}', '${mhs.whatsapp}')"><i class="fa-regular fa-eye"></i></button>
                        <button onclick="editInfo(${i}, '${mhs.picture}', '${mhs.nim}', '${mhs.fName}', '${mhs.lName}', '${mhs.jk}', '${mhs.jurusan}', '${mhs.angkatan}', '${mhs.email}', '${mhs.whatsapp}')"><i class="fa-regular fa-pen-to-square"></i></button>
                        <button onclick= "deleteInfo(${i})"><i class="fa-solid fa-trash-can"></i></button>
                    </td>
                </tr>`

                userInfo.innerHTML += createElement
                }
            }
        }
        else{
            userInfo.innerHTML =`<tr class="studentDetails"><td class="empty" colspan="11" align="center">No data available</td></tr>`;
        }
    }
    showInfo()

    function readInfo(pic, nimValue, fNameValue, lNameValue, jkValue, jurusanValue, angkatanValue, emailValue, whatsappValue) {
    imgInput.src = pic;
    nim.value = nimValue;
    fName.value = fNameValue;
    lName.value = lNameValue;
    jk.value = jkValue;
    jurusan.value = jurusanValue;
    angkatan.value = angkatanValue;
    email.value = emailValue;
    whatsapp.value = whatsappValue;



        darkBg.classList.add("active");
        popupForm.classList.add("active");    
        popupFooter.style.display = 'none';
        modalTitle.innerHTML = "Profile";
        formInputfields.forEach(input =>{
            input.disabled = true
        })

        imgHolder.style.pointerEvents = "none"
    

    }

    function editInfo(id, pic, nimValue, fNameValue, lNameValue, jkValue, jurusanValue, angkatanValue, emailValue, whatsappValue) {
        isEdit = true;
        editId = id;
    
        const originalIndex = originalData.findIndex(item => item.id === id);
        if (originalIndex >= 0) {
            originalData[originalIndex] = {
                id: id,
                picture: pic,
                nim: nimValue,
                fName: fNameValue,
                lName: lNameValue,
                jk: jkValue,
                jurusan: jurusanValue,
                angkatan: angkatanValue,
                email: emailValue,
                whatsapp: whatsappValue
            };
        }
        imgInput.src = pic;
        nim.value = nimValue;
        fName.value = fNameValue;
        lName.value = lNameValue;
        jk.value = jkValue;
        jurusan.value = jurusanValue;
        angkatan.value = angkatanValue;
        email.value = emailValue;
        whatsapp.value = whatsappValue;
    
        darkBg.classList.add("active");
        popupForm.classList.add("active");
        popupFooter.style.display = "block";
        modalTitle.innerHTML = "Update Form";
        submitBtn.innerHTML = "Update";
    
        formInputfields.forEach(input => {
            input.disabled = false;
        });
    
        imgHolder.style.pointerEvents = "none";
    }
    
    function deleteInfo(index) {
        if(confirm("Apakah anda ingin menghapus data ini?")){
            originalData.splice(index,1)
            localStorage.setItem("userProfile", JSON.stringify(originalData))

            getData = [...originalData]

            preLoadCalculations()

            if(getData.length === 0){
                currentIndex = 1
                startIndex = 1
                endIndex = 1
            }

            else if(currentIndex > maxIndex){
                currentIndex = maxIndex
            }

            showInfo()
            highlightIndexBtn()
            displayIndexBtn()

            var nextBtn = document.querySelector('.next')
            var prevBtn = document.querySelector('prev')

            if(Math.floor(maxIndex) > currentIndex){
                nextBtn.classList.add('act')
            }
            else{
                nextBtn.classList.remove('act')
            }

            if(currentIndex > 1){
                prevBtn.classList.add('act')
            }
        }
    }
    

    form.addEventListener('submit', (e)=> {
        e.preventDefault()

        const information = {
            id: Date.now(),
            picture: imgInput.src == undefined ? "images.png" : imgInput.src,
            nim: nim.value,
            fName: fName.value,
            lName: lName.value,
            jk: jk.value,
            jurusan: jurusan.value,
            angkatan: angkatan.value,
            email: email.value,
            whatsapp: whatsapp.value
        }

        if(!isEdit){
            originalData.push(information)
        }
        else{
            originalData[editId] = information
        }
        getData = [...originalData]
        localStorage.setItem('userProfile',JSON.stringify(originalData))

        submitBtn.innerHTML = "Submit"
        modalTitle.innerHTML = "Fill the form"

        darkBg.classList.remove('active')
        popupForm.classList.remove('active')
        form.reset()

        highlightIndexBtn()
        displayIndexBtn()
        showInfo()

        var nextBtn = document.querySelector(".next")
        var prevBtn = document.querySelector(".prev")
        if(Math.floor(maxIndex) > currentIndex){
            nextBtn.classList.add("act")
        }
        else{
            nextBtn.classList.remove("act")
        }

        if(currentIndex < 2){
            prevBtn.classList.remove("act")
        }
    })

    function next(){
        var prevBtn = document.querySelector('.prev')
        var nextBtn = document.querySelector('.next')

        if(currentIndex <= maxIndex -1){
            currentIndex++
            prevBtn.classList.add("act")

            highlightIndexBtn()
        }

        if(currentIndex > maxIndex -1){
            nextBtn.classList.remove("act")
        }
    }

    function prev(){
        var prevBtn = document.querySelector('.prev')

        if(currentIndex > 1){
            currentIndex--
            prevBtn.classList.add("act")
            highlightIndexBtn()
        }
        if(currentIndex < 2){
            prevBtn.classList.remove("act")
        }
    }

    function paginationBtn(i){
        currentIndex = i
        var prevBtn = document.querySelector('.prev')
        var nextBtn = document.querySelector('.next')

        highlightIndexBtn()

        if(currentIndex > maxIndex - 1){
            nextBtn.classList.remove("act")
        }
        else{
            nextBtn.classList.add("act")
        }

        if(currentIndex > 1){
            prevBtn.classList.add("act")
        }
        if(currentIndex < 2){
            prevBtn.classList.remove("act")
        }
    }

    tabSize.addEventListener('change', ()=>{
        var selectedValue = parseInt(tabSize.value)
        tableSize = selectedValue
        currentIndex = 1
        startIndex = 1
        displayIndexBtn()
    })
    
    displayIndexBtn()
