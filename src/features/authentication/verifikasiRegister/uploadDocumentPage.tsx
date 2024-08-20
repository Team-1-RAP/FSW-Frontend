import React, { useState } from "react"
import { Upload } from "react-feather"

const UploadDocumentPage: React.FC = () => {
  const [ktpFileName, setKtpFileName] = useState("Unggah KTP ke sini")
  const [fotoFileName, setFotoFileName] = useState("Unggah foto diri ke sini")
  const [ttdFileName, setTtdFileName] = useState("Unggah tanda tangan ke sini")

  const handleKtpChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setKtpFileName(file.name)
    } else {
      setKtpFileName("Unggah KTP ke sini")
    }
  }

  const handleFotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setFotoFileName(file.name)
    } else {
      setFotoFileName("Unggah foto diri ke sini")
    }
  }

  const handleTtdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setTtdFileName(file.name)
    } else {
      setTtdFileName("Unggah tanda tangan ke sini")
    }
  }

  return (
    <>
      <div className="flex flex-col gap-5 w-[340px] space-x-4 md:space-x-0">
        <div className="flex justify-center items-center">
          <h1 className="font-medium text-[28px]">Upload Dokumen</h1>
        </div>

        {/* KTP Upload */}
        <div className="flex flex-col justify-start items-start gap-1">
          <p className="font-light text-md">KTP</p>
          <div className="relative">
            <Upload width={32} height={32} className="text-[#c4c4c4] absolute left-2 top-3" />
            <input type="file" id="ktp-upload" className="hidden" onChange={handleKtpChange} />
            <label htmlFor="ktp-upload" className="bg-white border border-[#C4C4C4] text-[#C4C4C4] text-base rounded-lg block w-[300px] md:w-[390px] p-2.5 py-[15px] pl-[50px] pr-[10px] font-normal cursor-pointer">
              <span>{ktpFileName}</span>
            </label>
          </div>
        </div>

        {/* Foto Diri Upload */}
        <div className="flex flex-col justify-start items-start gap-1">
          <p className="font-light text-md">Foto Diri</p>
          <div className="relative">
            <Upload width={32} height={32} className="text-[#c4c4c4] absolute left-2 top-3" />
            <input type="file" id="foto-upload" className="hidden" onChange={handleFotoChange} />
            <label htmlFor="foto-upload" className="bg-white border border-[#C4C4C4] text-[#C4C4C4] text-base rounded-lg block w-[300px] md:w-[390px] p-2.5 py-[15px] pl-[50px] pr-[10px] font-normal cursor-pointer">
              <span>{fotoFileName}</span>
            </label>
          </div>
        </div>

        {/* Tanda Tangan Upload */}
        <div className="flex flex-col justify-start items-start gap-1">
          <p className="font-light text-md">Tanda Tangan</p>
          <div className="relative">
            <Upload width={32} height={32} className="text-[#c4c4c4] absolute left-2 top-3" />
            <input type="file" id="ttd-upload" className="hidden" onChange={handleTtdChange} />
            <label htmlFor="ttd-upload" className="bg-white border border-[#C4C4C4] text-[#C4C4C4] text-base rounded-lg block w-[300px] md:w-[390px] p-2.5 py-[15px] pl-[50px] pr-[10px] font-normal cursor-pointer">
              <span>{ttdFileName}</span>
            </label>
          </div>
        </div>

        <ul className="list-disc flex flex-col justify-start items-start text-[#718EBF] text-xs font-light pl-8">
          <li>File yang diupload berbentuk .jpg atau .jpeg</li>
          <li>Maksimal 2 MB</li>
        </ul>

        <div className="flex justify-end p-[20px] gap-5 pr-5 md:pr-0">
          <button className="bg-white w-[163px] h-[47px] rounded-xl border border-[#0066AE] text-[#0066AE]">Kembali</button>
          <button className="bg-[#0066AE] w-[163px] h-[47px] rounded-xl border text-white">Selanjutnya</button>
        </div>
      </div>
    </>
  )
}

export default UploadDocumentPage
