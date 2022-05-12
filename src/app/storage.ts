import { ref, getStorage, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { app } from './firebase.config';
const storage = getStorage(app)

const storageRef = (file: File) => ref(storage, 'images/' + file.name);
export const uploadTask = (file: File) => uploadBytesResumable(storageRef(file), file);

export const getImageUrl = async (file: File) => {
  return getDownloadURL(uploadTask(file).snapshot.ref)
}

export const getUrlImg = (file: File) => {
  let url = ''
  const upload = uploadTask(file)
  upload.on('state_changed',
    (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
      }
    },
    (error) => console.log(error.code),
    () => {
      getDownloadURL(uploadTask(file).snapshot.ref).then((downloadURL) => {
        url = downloadURL
        console.log('File available at', downloadURL);
      });
    }
  );
  return url
}

// const [image, setImage] = useState<File | null>(null)


// const handleMedia = (e: React.ChangeEvent<HTMLInputElement>) => {
//   if (e.target.files) {
//     const image = e.target.files[0]
//     if (typeof  image === 'string' || image === undefined){
//       alert('image not found')
//       console.log("Image format must be img, png , jpeg ")
//       return
//     }
//     setImage(image)
//     console.log(getUrlImg(image))
//     getImageUrl(image).then((downloadUrl) => {
//       console.log(downloadUrl)
//     })
//   }
// }

/* <UploadImage>
    <label htmlFor='imageFile'>
      Upload image
    </label>
    <input type="file"
      accept='image/gif, image/jpeg, image/png, image/jpg'
      name='image'
      id='imageFile'
      style={{ display: 'none' }}
      onChange={handleMedia}
    />
    <IconButton>
      <ImageSearch />
    </IconButton>
  </UploadImage> */