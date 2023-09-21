import { create } from "zustand"

export interface ModalStoreInterface {
  showId?: string
  isOpen: boolean
  openModal: (showId: string) => void
  closeModal: () => void
}

const useInfoModal = create<ModalStoreInterface>((set) => ({
  movieId: undefined,
  isOpen: false,
  openModal: (showId: string) => set({ isOpen: true, showId }),
  closeModal: () => set({ isOpen: false, showId: undefined }),
}))

export default useInfoModal
