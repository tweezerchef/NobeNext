import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { FC, ChangeEvent, useState, createRef } from "react";
import Webcam from "react-webcam";
import Modal from "@mui/material/Modal";
import { uploadToS3 } from "../../../utils/s3Upload";
import { useFormData } from "../../../context/regContext";
import { HiddenFileInput, LargeAvatar, Wrapper } from "./regCompStyles";

const ProfileAvatar: FC = () => {
  const { formData, updateFormData } = useFormData();
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState(
    "https://www.w3schools.com/howto/img_avatar.png"
  );
  const webcamRef = createRef<Webcam>();

  const handleFileUpload = async (file: File) => {
    try {
      const fileUrl = await uploadToS3(file);
      console.log(fileUrl);
      setAvatarUrl(fileUrl);
      updateFormData({ avatarUrl: fileUrl });
      // Update the avatar URL to display the new image
    } catch (error) {
      console.error("Error uploading file: ", error);
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (!file) return;

    void handleFileUpload(file);
  };
  const handleCameraCapture = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    setCapturedImage(imageSrc); // Store the captured image URL
  };
  const handleUseCapturedImage = async () => {
    if (capturedImage) {
      // Convert base64 URL to Blob
      const response = await fetch(capturedImage);
      const blob = await response.blob();

      // Create a File object
      const file = new File([blob], "captured-image.jpg", { type: blob.type });

      // Upload the File object
      await handleFileUpload(file);

      setCapturedImage(null); // Reset the captured image URL
      setIsCameraOpen(false); // Close the camera
    }
  };

  return (
    <Wrapper>
      {isCameraOpen ? (
        <>
          <Webcam ref={webcamRef} screenshotFormat='image/jpeg' />
          <IconButton color='default' onClick={handleCameraCapture}>
            <CameraAltIcon />
          </IconButton>
          <IconButton color='default' onClick={() => setIsCameraOpen(false)}>
            <CloseIcon />
          </IconButton>
        </>
      ) : (
        <>
          <HiddenFileInput
            accept='image/*'
            id='icon-button-file'
            type='file'
            onChange={handleFileChange}
          />
          <label htmlFor='icon-button-file'>
            <IconButton
              color='primary'
              aria-label='upload picture'
              component='span'
            >
              <LargeAvatar src={avatarUrl} />
            </IconButton>
          </label>
          <IconButton color='default' onClick={() => setIsCameraOpen(true)}>
            <CameraAltIcon />
          </IconButton>
        </>
      )}
      <Modal open={!!capturedImage} onClose={() => setCapturedImage(null)}>
        <div>
          {capturedImage && (
            <>
              <img src={capturedImage} alt='Captured' />
              <button type='button' onClick={handleUseCapturedImage}>
                Use this photo
              </button>
              <button type='button' onClick={() => setCapturedImage(null)}>
                Retake
              </button>
            </>
          )}
        </div>
      </Modal>
    </Wrapper>
  );
};

export default ProfileAvatar;
