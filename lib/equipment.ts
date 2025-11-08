export type EquipmentSlot = 'hat' | 'glasses' | 'accessory' | 'tool';

export interface Equipment {
  id: number;
  name: string;
  emoji: string;
  slot: EquipmentSlot;
  description: string;
  color: string;
}

export const EQUIPMENT_LIST: Equipment[] = [
  // Hats
  { id: 1, name: 'Mũ Phù Thủy', emoji: '🎩', slot: 'hat', description: 'Trí tuệ +10', color: '#8B008B' },
  { id: 2, name: 'Vương Miện', emoji: '👑', slot: 'hat', description: 'Quyền lực +10', color: '#FFD700' },
  { id: 3, name: 'Mũ Lưỡi Trai', emoji: '🧢', slot: 'hat', description: 'Phong cách +10', color: '#FF6347' },
  { id: 4, name: 'Mũ Sinh Nhật', emoji: '🎂', slot: 'hat', description: 'Vui vẻ +10', color: '#FFB6C1' },

  // Glasses
  { id: 5, name: 'Kính Học Giả', emoji: '👓', slot: 'glasses', description: 'Tập trung +10', color: '#4169E1' },
  { id: 6, name: 'Kính Mát', emoji: '🕶️', slot: 'glasses', description: 'Cool ngầu +10', color: '#000000' },
  { id: 7, name: 'Kính Bơi', emoji: '🥽', slot: 'glasses', description: 'Năng lượng +10', color: '#00CED1' },

  // Accessories
  { id: 8, name: 'Huy Chương Vàng', emoji: '🥇', slot: 'accessory', description: 'Nhà vô địch!', color: '#FFD700' },
  { id: 9, name: 'Huy Chương Bạc', emoji: '🥈', slot: 'accessory', description: 'Á quân xuất sắc!', color: '#C0C0C0' },
  { id: 10, name: 'Huy Chương Đồng', emoji: '🥉', slot: 'accessory', description: 'Top 3 tuyệt vời!', color: '#CD7F32' },
  { id: 11, name: 'Ngôi Sao', emoji: '⭐', slot: 'accessory', description: 'Sáng chói +10', color: '#FFD700' },
  { id: 12, name: 'Trái Tim', emoji: '❤️', slot: 'accessory', description: 'Yêu thương +10', color: '#FF0000' },
  { id: 19, name: 'Robot Đỏ', emoji: '🤖', slot: 'accessory', description: 'Công nghệ +15', color: '#FF0000' },
  { id: 20, name: 'Robot Xanh Lam', emoji: '🤖', slot: 'accessory', description: 'Công nghệ +15', color: '#0000FF' },
  { id: 21, name: 'Robot Vàng', emoji: '🤖', slot: 'accessory', description: 'Công nghệ +15', color: '#FFD700' },
  { id: 22, name: 'Robot Xanh Lá', emoji: '🤖', slot: 'accessory', description: 'Công nghệ +15', color: '#00FF00' },
  { id: 23, name: 'Robot Tím', emoji: '🤖', slot: 'accessory', description: 'Công nghệ +15', color: '#9400D3' },
  { id: 24, name: 'Robot Hồng', emoji: '🤖', slot: 'accessory', description: 'Công nghệ +15', color: '#FF69B4' },
  { id: 25, name: 'Robot Cam', emoji: '🤖', slot: 'accessory', description: 'Công nghệ +15', color: '#FF8C00' },
  { id: 26, name: 'Robot Bạc', emoji: '🤖', slot: 'accessory', description: 'Công nghệ +15', color: '#C0C0C0' },

  // Tools
  { id: 13, name: 'Bút Chì Vàng', emoji: '✏️', slot: 'tool', description: 'Viết đẹp +10', color: '#DAA520' },
  { id: 14, name: 'Sách Toán', emoji: '📚', slot: 'tool', description: 'Kiến thức +10', color: '#8B4513' },
  { id: 15, name: 'Máy Tính', emoji: '🔢', slot: 'tool', description: 'Tính nhanh +10', color: '#4682B4' },
  { id: 16, name: 'Cầu Vồng', emoji: '🌈', slot: 'tool', description: 'May mắn +10', color: '#FF69B4' },
  { id: 17, name: 'Ngôi Sao Bay', emoji: '🌟', slot: 'tool', description: 'Kỳ diệu +10', color: '#FFD700' },
  { id: 18, name: 'Tên Lửa', emoji: '🚀', slot: 'tool', description: 'Tốc độ +10', color: '#DC143C' },
  { id: 27, name: 'Robot Bay Đỏ', emoji: '🤖', slot: 'tool', description: 'Bay cao +15', color: '#FF0000' },
  { id: 28, name: 'Robot Bay Xanh', emoji: '🤖', slot: 'tool', description: 'Bay cao +15', color: '#1E90FF' },
  { id: 29, name: 'Robot Bay Vàng', emoji: '🤖', slot: 'tool', description: 'Bay cao +15', color: '#FFD700' },
];

export interface PlayerEquipment {
  hat?: Equipment;
  glasses?: Equipment;
  accessory?: Equipment;
  tool?: Equipment;
}

export function getRandomEquipment(): Equipment {
  return EQUIPMENT_LIST[Math.floor(Math.random() * EQUIPMENT_LIST.length)];
}

export function getEquipmentBySlot(slot: EquipmentSlot): Equipment[] {
  return EQUIPMENT_LIST.filter(e => e.slot === slot);
}
