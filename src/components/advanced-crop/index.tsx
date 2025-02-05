import 'cropperjs/dist/cropper.css';
import React, { useEffect, useRef, useState } from 'react';
import Cropper from 'react-cropper';
type AdvancedCropperProps = {
  url: string;
  onOk?: (file: File) => void;
  saveRef: React.MutableRefObject<HTMLDivElement | null>;
};

export const AdvancedCropper: React.FC<AdvancedCropperProps> = ({
  url,
  onOk,
  saveRef,
}) => {
  const [image, setImage] = useState<string>('');
  const cropperRef = useRef<HTMLImageElement>(null);

  const getCroppedImage = () => {
    // @ts-ignore
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      // 获取裁剪后的 base64
      // const base64 = cropper.getCroppedCanvas().toDataURL('image/jpeg');
      // 同时也生成文件
      cropper.getCroppedCanvas().toBlob((blob: any) => {
        if (blob) {
          // `${Math.floor(Math.random() / 1000)}.${file['name']
          const file = new File(
            [blob],
            `${Math.floor(Math.random() * 10000)}-cropped.jpg`,
            { type: 'image/jpeg' },
          );
          onOk?.(file);
          // console.log('裁剪结果:', file);
          // console.log('base64结果:', base64);
        }
      });
    }
  };

  useEffect(() => {
    setImage(url);
  }, [url]);

  return (
    <div>
      {image && (
        <Cropper
          src={image}
          ref={cropperRef}
          aspectRatio={1} // 固定宽高比
          guides={false}
          viewMode={1}
          responsive
          autoCropArea={0.8}
          background={false}
          zoomable={false}
        />
      )}
      <div
        onClick={getCroppedImage}
        ref={saveRef}
        className="absolute top-[10000px] left-[10000px]"
      >
        保存
      </div>
    </div>
  );
};
