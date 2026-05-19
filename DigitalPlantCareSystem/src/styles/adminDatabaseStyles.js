import styled from "styled-components";

export const Page = styled.div`
  min-height: 100vh;
  background: #f7f5ff;
  font-family: "Poppins", sans-serif;
`;

export const Container = styled.div`
  width: min(1392px, 92%);
  margin: 0 auto;
  padding: 38px 0 60px;
`;

export const TopRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;

  @media (max-width: 900px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const Titles = styled.div``;

export const Title = styled.h1`
  margin: 18px 0 4px;
  font-size: 24px;
  font-weight: 700;
  color: #2e2e2e;
`;

export const Subtitle = styled.p`
  margin: 0;
  font-size: 16px;
  font-weight: 400;
  color: #6b6b6b;
`;

export const AddButton = styled.button`
  margin-top: 20px;
  height: 48px;
  padding: 0 20px;
  border: none;
  border-radius: 12px;
  background: #6b8e6e;
  color: #fff;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 3px;
  white-space: nowrap;
  align-self: flex-start;

  @media (max-width: 900px) {
    width: fit-content;
    height: 44px;
    font-size: 16px;
    padding: 0 16px;
  }
`;

export const PlusImg = styled.img`
  width: 24px;
  height: 24px;
  object-fit: contain;
`;

export const SearchRow = styled.div`
  margin-top: 22px;
  display: flex;
  align-items: center;
  gap: 14px;
`;

export const SearchBox = styled.div`
  width: min(480px, 90%);
  height: 44px;
  background: #6b8e6e;
  border-radius: 12px;
  display: flex;
  align-items: center;
  padding: 0 12px;
  gap: 8px;
`;

export const SearchImg = styled.img`
  width: 22px;
  height: 22px;
  object-fit: contain;
`;

export const SearchInput = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  background: transparent;
  font-size: 18px;
  font-weight: 400;
  color: #2e2e2e;

  &::placeholder {
    color: #2e2e2e;
    opacity: 0.8;
  }
`;

export const StatsGrid = styled.div`
  margin-top: 26px;
  display: grid;
  grid-template-columns: repeat(4, minmax(220px, 1fr));
  gap: 20px;

  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, minmax(220px, 1fr));
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

export const StatCard = styled.div`
  background: #fff;
  border: 0.5px solid #6b6b6b;
  border-radius: 16px;
  height: 110px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export const StatValue = styled.div`
  font-size: 32px;
  font-weight: 700;
  line-height: 1;
  color: ${(p) => p.color || "#2e2e2e"};
`;

export const StatLabel = styled.div`
  margin-top: 6px;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.2;
  color: #6b6b6b;
`;

export const CardsGrid = styled.div`
  margin-top: 34px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 28px;
  justify-items: center;
`;

export const PlantCard = styled.div`
  background: white;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid #6b6b6b;  
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 400px;
  margin: 0 auto;

  &:hover {
    transform: scale(1.025);
    box-shadow: 0px 10px 28px rgba(109, 40, 217, 0.18);
  }
`;

export const PlantImage = styled.div`
  height: 220px;
  background: ${(p) =>
    p.src ? `url(${p.src}) center/cover no-repeat` : "#e9e9e9"};
`;

export const PlantBody = styled.div`
  padding: 14px 16px 14px;
`;

export const PlantName = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #2e2e2e;
`;

export const PlantLatin = styled.div`
  margin-top: 3px;
  font-size: 11px;
  font-weight: 400;
  font-style: italic;
  color: #6b6b6b;
`;

export const TagsRow = styled.div`
  margin-top: 8px;
  display: flex;
  gap: 8px;
`;

export const Tag = styled.div`
  padding: 2px 8px;
  border-radius: 4px;
  border: 0.33308px solid #6b6b6b;
  font-size: 10px;
  color: ${(p) => p.color || "#6b6b6b"};
  background: ${(p) => p.bg || "transparent"};
`;

export const CareRow = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

export const CareItem = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 5px;
`;

export const MiniImg = styled.img`
  width: 14px;
  height: 14px;
  object-fit: contain;
`;

export const CareText = styled.span`
  font-size: 11px;
  color: #6b6b6b;
`;

export const Desc = styled.p`
  margin: 8px 0 0;
  font-size: 10px;
  line-height: 14px;
  color: #6b6b6b;
`;

export const ButtonsRow = styled.div`
  margin-top: 14px;
  display: flex;
  gap: 12px;
`;

export const BtnIcon = styled.img`
  width: 14px;
  height: 14px;
  object-fit: contain;
`;

export const EditBtn = styled.button`
  flex: 1;
  height: 34px;
  background: #fff;
  border: 1px solid #b8b8b8;
  border-radius: 10px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  color: #2e2e2e;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
`;

export const DeleteBtn = styled.button`
  flex: 1;
  height: 34px;
  background: #e34f4f;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 11px;
  font-weight: 500;
  color: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
`;

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  display: grid;
  place-items: center;
  z-index: 9999;

  padding: 16px;
  box-sizing: border-box;

  overflow-y: auto;
  overflow-x: hidden;
`;

export const Modal = styled.div`
  width: min(732px, calc(100vw - 32px));
  max-width: 100%;
  max-height: calc(100dvh - 32px);

  overflow-y: auto;
  overflow-x: hidden;

  box-sizing: border-box;
  background: #fff;
  border-radius: 20px;
  padding: 20px 20px 16px;
  margin: auto;

  @media (max-width: 480px) {
    width: calc(100vw - 24px);
    max-height: calc(100dvh - 24px);
    padding: 16px 14px;
    border-radius: 16px;
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 14px;
`;

export const ModalTitleWrap = styled.div``;

export const ModalTitle = styled.div`
  font-weight: 600;
  font-size: 20px;
  line-height: 30px;
  color: #2e2e2e;
`;

export const ModalSubTitle = styled.div`
  margin-top: 2px;
  font-weight: 400;
  font-size: 13px;
  line-height: 20px;
  color: #6b6b6b;
`;

export const CloseBtn = styled.button`
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  font-size: 24px;
  line-height: 1;
  color: #6b6b6b;
  cursor: pointer;
`;

export const Form = styled.form`
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Grid2 = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;

  @media (max-width: 680px) {
    grid-template-columns: 1fr;
  }
`;

export const Grid3 = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;

  @media (max-width: 680px) {
    grid-template-columns: 1fr;
  }
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const Label = styled.label`
  font-weight: 500;
  font-size: 13px;
  line-height: 20px;
  color: #000;
`;

export const TextInput = styled.input`
  height: 44px;
  border: none;
  outline: none;
  background: #f3f3f5;
  border-radius: 12px;
  padding: 0 12px;
  font-size: 14px;
  color: #2e2e2e;
`;

export const TextArea = styled.textarea`
  border: none;
  outline: none;
  background: #f3f3f5;
  border-radius: 12px;
  padding: 10px 12px;
  font-size: 14px;
  color: #2e2e2e;
  resize: none;
`;

export const UploadBtn = styled.button`
  width: 140px;
  height: 44px;
  border: none;
  background: #f3f3f5;
  border-radius: 12px;
  cursor: pointer;
  color: #6b6b6b;
  font-size: 13px;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
`;

export const Select = styled.select`
  height: 44px;
  border: none;
  outline: none;
  background: #f3f3f5;
  border-radius: 8px;
  padding: 0 10px;
  font-size: 14px;
  color: #2e2e2e;
`;

export const Actions = styled.div`
  margin-top: 6px;
  display: flex;
  justify-content: flex-end;
  gap: 14px;
  flex-wrap: wrap;

  @media (max-width: 480px) {
    flex-direction: column-reverse;
    align-items: stretch;
  }
`;

export const CancelBtn = styled.button`
  width: 110px;
  height: 46px;
  background: #fff;
  border: 1px solid #6b6b6b;
  border-radius: 10px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 400;
  color: #2e2e2e;

  @media (max-width: 480px) {
    width: 100%;
  }
`;

export const PrimaryBtn = styled.button`
  width: 180px;
  height: 46px;
  border: none;
  background: #6b8e6e;
  border-radius: 10px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  color: #fff;

  @media (max-width: 480px) {
    width: 100%;
  }
`;

export const ImageUploadArea = styled.div`
  border: 2px dashed ${(p) => (p.$hasImage ? "#6b8e6e" : "#d1d5db")};
  border-radius: 12px;
  background: ${(p) => (p.$hasImage ? "#f0fdf4" : "#f9fafb")};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  overflow: hidden;
  min-height: 140px;
  position: relative;
  &:hover {
    border-color: #6b8e6e;
    background: #f0fdf4;
  }
`;
export const PreviewImg = styled.img`
  width: 100%;
  height: 140px;
  object-fit: cover;
  display: block;
`;
export const UploadOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s;
  color: white;
  font-size: 13px;
  font-weight: 600;
  gap: 4px;
  ${ImageUploadArea}:hover & {
    opacity: 1;
  }
`;
export const UploadPlaceholder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 20px;
  color: #9ca3af;
`;
