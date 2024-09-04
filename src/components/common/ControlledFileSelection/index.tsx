import React, {FC} from 'react'
import { Controller } from 'react-hook-form'

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  control: any
  name: string
  fileRef: any
  setUrl: React.Dispatch<React.SetStateAction<string | null>>
  acceptArr: string[]
  prevFile: any
  prevFileUrl: string | null
  setOpenCropDialog?: React.Dispatch<React.SetStateAction<boolean>>
}

const ControlledFileSelection: FC<IProps> = ({
  control,
  name,
  fileRef,
  setUrl,
  acceptArr,
  prevFile,
  prevFileUrl,
  setOpenCropDialog,
  ...rest
}) => {
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0]
    if(file && acceptArr.includes(file?.type)){
      setUrl(URL.createObjectURL(file))
      setOpenCropDialog && setOpenCropDialog(true)
    }
      else setUrl(prevFileUrl)

    return file ? file : prevFile
  }
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={null}
      render={({ field }) => (
        <input
          ref={fileRef}
          style={{ display: 'none' }}
          type="file"
          onChange={(e) => {
            field.onChange(onChangeHandler(e))
          }}
          {...rest}
        />
      )}
    />
  )
}

export default ControlledFileSelection
