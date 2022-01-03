//!Ajax+Django Crop Images
console.log('Hello World')

const alertBox = document.getElementById('alert-box')
const imageBox = document.getElementById('image-box')
const imageForm = document.getElementById('image-form')
const inputImageFile = document.getElementById('id_file')
const confirmBtn = document.getElementById('confirm-btn')

const csrf = document.getElementsByName('csrfmiddlewaretoken')

inputImageFile.addEventListener('change',()=>{
    alertBox.innerHTML = ''
    confirmBtn.classList.remove('d-none')
    const img_data = inputImageFile.files[0]
    const imgUrl = URL.createObjectURL(img_data)

    imageBox.innerHTML = `<img src="${imgUrl}" id="image-default" width="700px" class="img-fluid border rounded shadow">`


    var $image = $('#image-default')

    $image.cropper({
        aspectRatio: 16 / 9,
        crop: function (event) {
            console.log(event.detail.x);
            console.log(event.detail.y);
            console.log(event.detail.width);
            console.log(event.detail.height);
            console.log(event.detail.rotate);
            console.log(event.detail.scaleX);
            console.log(event.detail.scaleY);
        }
    });

    var cropper = $image.data('cropper');

    confirmBtn.addEventListener('click',()=>{
        cropper.getCroppedCanvas().toBlob((blob)=>{
            const fd = new FormData()
            fd.append('csrfmiddlewaretoken',csrf[0].value)
            fd.append('file',blob,'my-image.png')
            

            $.ajax({
                type:'POST',
                url:fd.action,
                enctype:'multipart/form-data',
                data:fd,
                success:function(response){
                    console.log(response)
                    alertBox.innerHTML = `
                        <div class="alert alert-success" role="alert">
                            <strong>Successfully saved and croped the selected image</strong>>
                        </div>
                    `

                    setTimeout(function(){
                        alertBox.innerHTML = ''
                    },2000)
                },
                error:function(err){
                    console.log(err)
                    alertBox.innerHTML = `
                        <div class="alert alert-danger" role="alert">
                            <strong>Ups...something went wrong</strong>>
                        </div>
                    `
                },
                cache:false,
                contentType:false,
                processData:false
            })
        })
    })

    
})



