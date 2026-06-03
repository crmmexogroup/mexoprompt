const fs = require('fs');
const path = require('path');

const appJsPath = path.join(__dirname, 'app.js');
if (!fs.existsSync(appJsPath)) {
  console.error("Không tìm thấy tệp app.js!");
  process.exit(1);
}

const content = fs.readFileSync(appJsPath, 'utf8');

// Tìm khai báo const SECTIONS = [
const startIdx = content.indexOf('const SECTIONS = [');
if (startIdx === -1) {
  console.error("Không tìm thấy biến SECTIONS trong app.js!");
  process.exit(1);
}

// Trích xuất mảng SECTIONS bằng cách khớp các dấu ngoặc vuông
let bracketCount = 0;
let endIdx = -1;
for (let i = startIdx + 'const SECTIONS ='.length; i < content.length; i++) {
  if (content[i] === '[') bracketCount++;
  if (content[i] === ']') {
    bracketCount--;
    if (bracketCount === 0) {
      endIdx = i;
      break;
    }
  }
}

if (endIdx === -1) {
  console.error("Không phân tích được cấu trúc mảng SECTIONS!");
  process.exit(1);
}

const sectionsStr = content.substring(startIdx + 'const SECTIONS ='.length, endIdx + 1);

// Đánh giá chuỗi mảng thành đối tượng JavaScript thực tế
let SECTIONS;
try {
  SECTIONS = new Function(`return ${sectionsStr};`)();
} catch (e) {
  console.error("Lỗi khi chuyển đổi mảng SECTIONS:", e);
  process.exit(1);
}

// --- 1. Tạo tệp MARKDOWN (.md) ---
let md = "# Thư viện Cấu trúc & Từ khóa Prompt - MEXO V1.1\n\n";
md += "Tài liệu này chứa danh sách toàn bộ danh mục hiển thị trên web và từ khóa tiếng Anh tương ứng.\n\n";

SECTIONS.forEach(sec => {
  md += `## ${sec.icon} Danh mục: ${sec.vi} (${sec.en || sec.id})\n`;
  md += `*Kiểu hiển thị trên giao diện: \`${sec.type}\`*\n\n`;

  if (sec.cats) {
    sec.cats.forEach(cat => {
      md += `### 🔸 Nhóm thuộc tính: ${cat.vi} (ID: \`${cat.id}\`)\n`;
      md += "| Tiếng Việt (Hiển thị trên Web) | Tiếng Anh (Từ khóa Prompt ghép vào) | Ghi chú / Icon |\n";
      md += "| --- | --- | --- |\n";
      cat.items.forEach(item => {
        md += `| ${item.vi} | \`${item.en}\` | ${item.desc || item.icon || '-'} |\n`;
      });
      md += "\n";
    });
  }

  if (sec.nestedCats) {
    sec.nestedCats.forEach(nc => {
      md += `### 🔹 Nhóm phân nhánh: ${nc.vi} (ID: \`${nc.id}\`)\n`;
      md += "| Tiếng Việt (Hiển thị trên Web) | Tiếng Anh (Từ khóa Prompt ghép vào) | Nhóm cha liên kết |\n";
      md += "| --- | --- | --- |\n";
      nc.items.forEach(item => {
        md += `| ${item.vi} | \`${item.en}\` | \`${item.catId || nc.id}\` |\n`;
      });
      md += "\n";
    });
  }

  if (sec.lensOptions) {
    md += "### 📷 Danh sách Ống kính (Lens Options)\n";
    md += "| Tiêu cự (mm) | Tiếng Việt | Ứng dụng khuyên dùng | Góc nhìn mô phỏng (FOV) |\n";
    md += "| --- | --- | --- | --- |\n";
    sec.lensOptions.forEach(l => {
      md += `| ${l.mm}mm | ${l.vi} | ${l.use} | ${l.fovH}% |\n`;
    });
    md += "\n";
  }
  md += "---\n\n";
});

fs.writeFileSync(path.join(__dirname, 'prompt_catalog.md'), md, 'utf8');
console.log("Tạo thành công tệp: prompt_catalog.md");

// --- 2. Tạo tệp EXCEL CSV (.csv) ---
let csv = "\ufeff"; // Thêm BOM UTF-8 để Excel hiển thị đúng tiếng Việt có dấu
csv += "Danh mục lớn,Nhóm thuộc tính,Tiếng Việt (Hiển thị),Tiếng Anh (Từ khóa Prompt),Ghi chú / Nhóm cha\n";

SECTIONS.forEach(sec => {
  const secName = sec.vi;
  
  if (sec.cats) {
    sec.cats.forEach(cat => {
      const catName = cat.vi;
      cat.items.forEach(item => {
        const desc = item.desc || item.icon || '';
        csv += `"${escapeCsv(secName)}","${escapeCsv(catName)}","${escapeCsv(item.vi)}","${escapeCsv(item.en)}","${escapeCsv(desc)}"\n`;
      });
    });
  }
  
  if (sec.nestedCats) {
    sec.nestedCats.forEach(nc => {
      const catName = nc.vi;
      nc.items.forEach(item => {
        const parent = `Nhóm cha: ${item.catId || nc.id}`;
        csv += `"${escapeCsv(secName)}","${escapeCsv(catName)}","${escapeCsv(item.vi)}","${escapeCsv(item.en)}","${escapeCsv(parent)}"\n`;
      });
    });
  }
  
  if (sec.lensOptions) {
    sec.lensOptions.forEach(l => {
      csv += `"${escapeCsv(secName)}","Ống kính","${escapeCsv(l.mm + 'mm ' + l.vi)}","${escapeCsv(l.mm + 'mm')}","${escapeCsv(l.use)}"\n`;
    });
  }
});

fs.writeFileSync(path.join(__dirname, 'prompt_catalog.csv'), csv, 'utf8');
console.log("Tạo thành công tệp: prompt_catalog.csv");

function escapeCsv(text) {
  return (text || '').replace(/"/g, '""').replace(/\r?\n/g, ' ');
}
