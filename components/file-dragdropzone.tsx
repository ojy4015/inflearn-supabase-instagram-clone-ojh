// 'use client';

// import { Button, Spinner } from '@material-tailwind/react';
// import { useMutation } from '@tanstack/react-query';
// import { uploadFile } from 'actions/storageActions';
// import { queryClient } from 'config/ReactQueryClientProvider';
// import { SP } from 'node_modules/next/dist/shared/lib/utils';
// import { useCallback, useRef } from 'react';
// import { useDropzone } from 'react-dropzone';

// export default function FileDragDropZone() {
//   // const fileRef = useRef(null);
//   const uploadImageMutation = useMutation({
//     mutationFn: (values: FormData) => uploadFile(values),
//     onSuccess: () => {
//       queryClient.invalidateQueries({
//         queryKey: ['images'],
//       });
//     },
//   });

//   // 파일 여러개를 업로드 할경우
//   const onDrop = useCallback(async (acceptedFiles) => {
//     if (acceptedFiles.length > 0) {
//       const formData = new FormData();

//       acceptedFiles.forEach((file) => {
//         formData.append(file.name, file);
//       });
//       // console.log('acceptedFiles  ; ', acceptedFiles);
//       // acceptedFiles  ;  Array(2)
//       // 0 : File {handle: FileSystemFileHandle, path: './pic26.jpg', relativePath: './pic26.jpg', name: 'pic26.jpg', lastModified: 1745996802000, …}
//       // 1 : File {handle: FileSystemFileHandle, path: './pic27.jpg', relativePath: './pic27.jpg', name: 'pic27.jpg', lastModified: 1745996802000, …}

//       await uploadImageMutation.mutate(formData);
//     }
//   }, []);

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop,
//     multiple: true,
//   });

//   return (
//     <div
//       {...getRootProps()}
//       className="w-full py-20 border-4 border-dotted border-indigo-700 flex flex-col items-center justify-center cursor-pointer"
//     >
//       <input {...getInputProps()} />
//       {uploadImageMutation.isPending ? (
//         <Spinner />
//       ) : isDragActive ? (
//         <p>파일을 놓아주세요.</p>
//       ) : (
//         <p>파일을 여기에 끌어다 놓거나 클릭하여 업로드하세요.</p>
//       )}
//     </div>
//   );

//   // 파일 한개를 업로드할경우
//   // const onDrop = useCallback(async (acceptedFiles) => {
//   //   // Do something with the files
//   //   const file = acceptedFiles?.[0];
//   //   console.log('file ; ', file);
//   //   // File {handle: FileSystemFileHandle, path: './pic27.jpg', relativePath: './pic27.jpg', name: 'pic27.jpg', lastModified: 1745996802000, …}

//   //   if (file) {
//   //     const formData = new FormData();
//   //     formData.append('file', file);
//   //     // const result = await uploadFile(formData);
//   //     await uploadImageMutation.mutate(formData);
//   //     // console.log(uploadImageMutation.data);
//   //     // {path: 'pic10.jpg', id: '14dbc99a-0edf-46cc-adc8-83f5088f58cb', fullPath: 'minibox/pic10.jpg'}
//   //   }
//   // }, []);

//   // const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

//   // return (
//   //   <div
//   //     {...getRootProps()}
//   //     className="w-full py-20 border-4 border-dotted border-indigo-700 flex flex-col items-center justify-center cursor-pointer"
//   //   >
//   //     <input {...getInputProps()} />
//   //     {uploadImageMutation.isPending ? (
//   //       <Spinner />
//   //     ) : isDragActive ? (
//   //       <p>파일을 놓아주세요.</p>
//   //     ) : (
//   //       <p>파일을 여기다 끌어다 놓거나 클릭하여 업로드하세요.</p>
//   //     )}
//   //   </div>
//   // );

//   // fileRef사용
//   // return (
//   //   <forw-full
//   //     className=""
//   //     onSubmit={(e) => {
//   //       e.preventDefault();
//   //       const file = fileRef.current.files?.[0];
//   //       console.log('file ; ', file);

//   //       if (file) {
//   //         const formData = new FormData();
//   //         formData.append('file', file);
//   //         // const result = await uploadFile(formData);
//   //         const result = uploadImageMutation.mutate(formData);
//   //         console.log('result : ', result);
//   //       }
//   //     }}
//   //   >
//   //     <input ref={fileRef} type="file" className="" />
//   //     <p>파일을 여기에 끌어다 놓거나 클릭하여 업로드하세요.</p>
//   //     <Button loading={uploadImageMutation.isPending} type="submit">
//   //       파일 업로드
//   //     </Button>
//   //   </forw-full py-20 border-4 border-dotted border-indigo-700 flex flex-col items-center justify-centerm>
//   // );
// }

////////////////////////////////////////
'use client';

import { Button, Spinner } from '@material-tailwind/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { uploadFile } from 'actions/storageActions';
// import { queryClient } from 'config/ReactQueryClientProvider';
import { SP } from 'node_modules/next/dist/shared/lib/utils';
import { useCallback, useRef } from 'react';
import { useDropzone } from 'react-dropzone';

export default function FileDragDropZone() {
  const queryClient = useQueryClient();
  // const fileRef = useRef(null);
  const uploadImageMutation = useMutation({
    mutationFn: (values: FormData) => uploadFile(values),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['images'],
      });
    },
  });

  // 파일 여러개를 업로드 할경우
  const onDrop = useCallback(async (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const formData = new FormData();

      acceptedFiles.forEach((file) => {
        formData.append(file.name, file);
      });
      // console.log('acceptedFiles  ; ', acceptedFiles);
      // acceptedFiles  ;  Array(2)
      // 0 : File {handle: FileSystemFileHandle, path: './pic26.jpg', relativePath: './pic26.jpg', name: 'pic26.jpg', lastModified: 1745996802000, …}
      // 1 : File {handle: FileSystemFileHandle, path: './pic27.jpg', relativePath: './pic27.jpg', name: 'pic27.jpg', lastModified: 1745996802000, …}

      await uploadImageMutation.mutate(formData);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
  });

  return (
    <div
      {...getRootProps()}
      className="w-full py-20 border-4 border-dotted border-indigo-700 flex flex-col items-center justify-center cursor-pointer"
    >
      <input {...getInputProps()} />
      {uploadImageMutation.isPending ? (
        <Spinner />
      ) : isDragActive ? (
        <p>파일을 놓아주세요.</p>
      ) : (
        <p>파일을 여기에 끌어다 놓거나 클릭하여 업로드하세요.</p>
      )}
    </div>
  );

  // 파일 한개를 업로드할경우
  // const onDrop = useCallback(async (acceptedFiles) => {
  //   // Do something with the files
  //   const file = acceptedFiles?.[0];
  //   console.log('file ; ', file);
  //   // File {handle: FileSystemFileHandle, path: './pic27.jpg', relativePath: './pic27.jpg', name: 'pic27.jpg', lastModified: 1745996802000, …}

  //   if (file) {
  //     const formData = new FormData();
  //     formData.append('file', file);
  //     // const result = await uploadFile(formData);
  //     await uploadImageMutation.mutate(formData);
  //     // console.log(uploadImageMutation.data);
  //     // {path: 'pic10.jpg', id: '14dbc99a-0edf-46cc-adc8-83f5088f58cb', fullPath: 'minibox/pic10.jpg'}
  //   }
  // }, []);

  // const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  // return (
  //   <div
  //     {...getRootProps()}
  //     className="w-full py-20 border-4 border-dotted border-indigo-700 flex flex-col items-center justify-center cursor-pointer"
  //   >
  //     <input {...getInputProps()} />
  //     {uploadImageMutation.isPending ? (
  //       <Spinner />
  //     ) : isDragActive ? (
  //       <p>파일을 놓아주세요.</p>
  //     ) : (
  //       <p>파일을 여기다 끌어다 놓거나 클릭하여 업로드하세요.</p>
  //     )}
  //   </div>
  // );

  // fileRef사용
  // return (
  //   <forw-full
  //     className=""
  //     onSubmit={(e) => {
  //       e.preventDefault();
  //       const file = fileRef.current.files?.[0];
  //       console.log('file ; ', file);

  //       if (file) {
  //         const formData = new FormData();
  //         formData.append('file', file);
  //         // const result = await uploadFile(formData);
  //         const result = uploadImageMutation.mutate(formData);
  //         console.log('result : ', result);
  //       }
  //     }}
  //   >
  //     <input ref={fileRef} type="file" className="" />
  //     <p>파일을 여기에 끌어다 놓거나 클릭하여 업로드하세요.</p>
  //     <Button loading={uploadImageMutation.isPending} type="submit">
  //       파일 업로드
  //     </Button>
  //   </forw-full py-20 border-4 border-dotted border-indigo-700 flex flex-col items-center justify-centerm>
  // );
}
