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
  font-size: 30px;
  font-weight: 700;
  color: #2e2e2e;
`;

export const Subtitle = styled.p`
  margin: 0;
  font-size: 20px;
  font-weight: 400;
  color: #6b6b6b;
`;
export const AddButton = styled.button`
  margin-top: 20px;
  height: 56px;
  padding: 0 24px;
  border: none;
  border-radius: 14px;
  background: #6b8e6e;
  color: #fff;
  font-size: 22px;
  font-weight: 700;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 3px;
  white-space: nowrap;
  align-self: flex-start;

  @media (max-width: 900px) {
    width: fit-content;
    height: 50px;
    font-size: 18px;
    padding: 0 18px;
  }
`;

export const PlusImg = styled.img`
  width: 30px;
  height: 30px;
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
  height: 51px;
  background: #6b8e6e;
  border-radius: 15px;
  display: flex;
  align-items: center;
  padding: 0 14px;
  gap: 10px;
`;

export const SearchImg = styled.img`
  width: 30px;
  height: 30px;
  object-fit: contain;
`;

export const SearchInput = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  background: transparent;
  font-size: 23px;
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
  gap: 22px;

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
  border-radius: 20px;
  height: 132px;
  padding: 16px 18px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const StatValue = styled.div`
  font-size: 45px;
  font-weight: 700;
  line-height: 1;
  color: ${(p) => p.color || "#2e2e2e"};
`;

export const StatLabel = styled.div`
  margin-top: 10px;
  font-size: 22px;
  font-weight: 400;
  color: #6b6b6b;
`;

export const CardsGrid = styled.div`
  margin-top: 34px;
  display: grid;
  grid-template-columns: repeat(3, minmax(280px, 1fr));
  gap: 28px;

  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, minmax(280px, 1fr));
  }
  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

export const PlantCard = styled.div`
  background: #fff;
  border: 0.666161px solid #6b6b6b;
  border-radius: 16.654px;
  overflow: hidden;
`;

export const PlantImage = styled.div`
  height: 207.84px;
  background: ${(p) =>
    p.src ? `url(${p.src}) center/cover no-repeat` : "#e9e9e9"};
`;

export const PlantBody = styled.div`
  padding: 14px 16px 12px;
`;

export const PlantName = styled.div`
  font-size: 21.3171px;
  font-weight: 700;
  color: #2e2e2e;
`;

export const PlantLatin = styled.div`
  margin-top: 4px;
  font-size: 11.3247px;
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
  border-radius: 3.3308px;
  border: 0.33308px solid #6b6b6b;
  font-size: 9.99241px;
  color: ${(p) => p.color || "#6b6b6b"};
  background: ${(p) => p.bg || "transparent"};
`;

export const CareRow = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
`;

export const CareItem = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
`;

export const MiniImg = styled.img`
  width: 16px;
  height: 16px;
  object-fit: contain;
`;

export const CareText = styled.span`
  font-size: 11.3247px;
  color: #6b6b6b;
`;

export const Desc = styled.p`
  margin: 10px 0 0;
  font-size: 9.99241px;
  line-height: 15px;
  color: #6b6b6b;
`;

export const ButtonsRow = styled.div`
  margin-top: 14px;
  display: flex;
  gap: 12px;
`;

export const BtnIcon = styled.img`
  width: 16px;
  height: 16px;
  object-fit: contain;
`;

export const EditBtn = styled.button`
  flex: 1;
  height: 31.31px;
  background: #fff;
  border: 0.666161px solid #6b6b6b;
  border-radius: 9.99241px;
  cursor: pointer;
  font-size: 13.3232px;
  font-weight: 500;
  color: #2e2e2e;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

export const DeleteBtn = styled.button`
  flex: 1;
  height: 31.31px;
  background: #e34f4f;
  border: none;
  border-radius: 9.99241px;
  cursor: pointer;
  font-size: 11.3247px;
  font-weight: 500;
  color: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;
/* ✅ MODAL FIX: not cut + responsive + scroll inside */
export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  display: grid;
  place-items: center;
  z-index: 9999;
  padding: 20px;
`;

export const Modal = styled.div`
  width: min(732px, 96vw);
  max-height: calc(100vh - 60px); /* ✅ IMPORTANT */
  overflow-y: auto;              /* ✅ IMPORTANT */
  background: #ffffff;
  border-radius: 25px;
  padding: 22px 22px 18px;
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
  font-size: 23.2258px;
  line-height: 35px;
  color: #2e2e2e;
`;

export const ModalSubTitle = styled.div`
  margin-top: 2px;
  font-weight: 400;
  font-size: 15px;
  line-height: 22px;
  color: #6b6b6b;
`;

export const CloseBtn = styled.button`
  width: 36px;
  height: 36px;
  border: none;
  background: transparent;
  font-size: 28px;
  line-height: 1;
  color: #6b6b6b;
  cursor: pointer;
`;

export const Form = styled.form`
  margin-top: 14px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Grid2 = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 680px) {
    grid-template-columns: 1fr;
  }
`;

export const Grid3 = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;

  @media (max-width: 680px) {
    grid-template-columns: 1fr;
  }
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const Label = styled.label`
  font-weight: 500;
  font-size: 15px;
  line-height: 22px;
  color: #000;
`;

export const TextInput = styled.input`
  height: 50px;
  border: none;
  outline: none;
  background: #f3f3f5;
  border-radius: 15px;
  padding: 0 14px;
  font-size: 15px;
  color: #2e2e2e;
`;

export const TextArea = styled.textarea`
  border: none;
  outline: none;
  background: #f3f3f5;
  border-radius: 15px;
  padding: 12px 14px;
  font-size: 15px;
  color: #2e2e2e;
  resize: none;
`;

export const UploadBtn = styled.button`
  width: 162px;
  height: 50px;
  border: none;
  background: #f3f3f5;
  border-radius: 15px;
  cursor: pointer;
  color: #6b6b6b;
  font-size: 15px;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 14px;
`;

export const Select = styled.select`
  height: 50px;
  border: none;
  outline: none;
  background: #f3f3f5;
  border-radius: 10px;
  padding: 0 12px;
  font-size: 15px;
  color: #2e2e2e;
`;

export const Actions = styled.div`
  margin-top: 6px;
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  flex-wrap: wrap;
`;

export const CancelBtn = styled.button`
  width: 127px;
  height: 53px;
  background: #fff;
  border: 1px solid #6b6b6b;
  border-radius: 12px;
  cursor: pointer;
  font-size: 20px;
  font-weight: 400;
  color: #2e2e2e;
`;

export const PrimaryBtn = styled.button`
  width: 216px;
  height: 53px;
  border: none;
  background: #6b8e6e;
  border-radius: 12px;
  cursor: pointer;
  font-size: 20px;
  font-weight: 500;
  color: #fff;
`;