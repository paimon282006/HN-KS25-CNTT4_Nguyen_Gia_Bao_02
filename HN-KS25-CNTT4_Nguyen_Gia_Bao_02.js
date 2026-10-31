let members = [
  { memberCode: "GYM-001", fullName: "Hoàng Văn Nam", packageName: "Gói cơ bản", age: 22, monthCount: 3 },
  { memberCode: "GYM-002", fullName: "Lý Thị Mai", packageName: "Gói Yoga", age: 30, monthCount: 6 },
  { memberCode: "GYM-003", fullName: "Bùi Đức Anh", packageName: "Gói thể hình nâng cao", age: 27, monthCount: 12 }
];

let promptStr = `=====================================================
    HỆ THỐNG QUẢN LÝ DANH SÁCH HỘI VIÊN
=====================================================
1. Hiển thị danh sách hội viên
2. Thêm hội viên mới
3. Cập nhật thông tin hội viên
4. Xóa hội viên
5. Tìm kiếm hội viên theo gói tập
0. Thoát chương trình
=====================================================
Vui lòng nhập lựa chọn của bạn (0 - 5):`;

const displayMembers = (list) => {
  if (list.length === 0) {
    console.log("Danh sách hội viên trống");
    alert("Danh sách hội viên trống");
    return;
  }

  let outputText = "=== DANH SÁCH HỘI VIÊN ===\n";
  for (let i = 0; i < list.length; i++) {
    let item = list[i];
    let line = `${i + 1}. Mã: ${item.memberCode} - Tên: ${item.fullName} - Gói: ${item.packageName}\n   Tuổi: ${item.age} | Số tháng: ${item.monthCount}`;
    console.log(line);
    outputText += line + "\n";
  }

  let summary = `Tổng số hội viên: ${list.length}`;
  console.log(summary);
  outputText += "\n" + summary;
  alert(outputText);
};

const findMemberIndex = (code) => {
  if (!code) {
    return -1;
  }
  let target = code.trim().toUpperCase();
  for (let i = 0; i < members.length; i++) {
    if (members[i].memberCode === target) {
      return i;
    }
  }
  return -1;
};

const validateMemberCode = (code) => {
  if (code === null) {
    return "Hủy thao tác thêm";
  }
  let trimmed = code.trim();
  if (trimmed === "") {
    return "Chưa nhập mã hội viên";
  }
  let upper = trimmed.toUpperCase();
  if (upper.length < 6) {
    return "Độ dài nhỏ hơn 6 ký tự";
  }
  if (!upper.startsWith("GYM-")) {
    return "Sai tiền tố \"GYM-\"";
  }
  if (upper.includes(" ")) {
    return "Chứa khoảng trắng";
  }
  if (findMemberIndex(upper) !== -1) {
    return "Mã hội viên đã tồn tại";
  }
  return "";
};

const inputPositiveInteger = (message) => {
  while (true) {
    let input = prompt(message);
    if (input === null) {
      return null;
    }
    let trimmed = input.trim();
    if (trimmed === "") {
      alert("Không được để trống. Vui lòng nhập số nguyên lớn hơn 0!");
      continue;
    }
    let num = Number(trimmed);
    if (isNaN(num) || num <= 0 || !Number.isInteger(num)) {
      alert("Giá trị không hợp lệ! Vui lòng nhập số nguyên lớn hơn 0.");
      continue;
    }
    return num;
  }
};

const normalizeName = (str) => {
  let words = str.trim().split(/\s+/);
  let result = [];
  for (let i = 0; i < words.length; i++) {
    let word = words[i];
    let capitalized = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    result.push(capitalized);
  }
  return result.join(" ");
};

const addNewMember = () => {
  let rawCode = prompt("Nhập mã hội viên (ví dụ: GYM-004):");
  let validationError = validateMemberCode(rawCode);
  if (validationError !== "") {
    console.log(validationError);
    if (validationError !== "Hủy thao tác thêm") {
      alert(validationError);
    }
    return;
  }
  let memberCode = rawCode.trim().toUpperCase();

  let rawFullName = prompt("Nhập tên hội viên:");
  if (rawFullName === null) {
    console.log("Hủy thao tác thêm hội viên.");
    return;
  }
  while (rawFullName.trim() === "") {
    alert("Tên hội viên không được để trống!");
    rawFullName = prompt("Nhập tên hội viên:");
    if (rawFullName === null) {
      console.log("Hủy thao tác thêm hội viên.");
      return;
    }
  }
  let fullName = normalizeName(rawFullName);

  let rawPackageName = prompt("Nhập gói tập:");
  if (rawPackageName === null) {
    console.log("Hủy thao tác thêm hội viên.");
    return;
  }
  while (rawPackageName.trim() === "") {
    alert("Tên gói tập không được để trống!");
    rawPackageName = prompt("Nhập gói tập:");
    if (rawPackageName === null) {
      console.log("Hủy thao tác thêm hội viên.");
      return;
    }
  }
  let packageName = normalizeName(rawPackageName);

  let age = inputPositiveInteger("Nhập tuổi (số nguyên > 0):");
  if (age === null) {
    console.log("Hủy thao tác thêm hội viên.");
    return;
  }

  let monthCount = inputPositiveInteger("Nhập số tháng đăng ký (số nguyên > 0):");
  if (monthCount === null) {
    console.log("Hủy thao tác thêm hội viên.");
    return;
  }

  let newMember = {
    memberCode: memberCode,
    fullName: fullName,
    packageName: packageName,
    age: age,
    monthCount: monthCount
  };

  members.push(newMember);

  let invoice = `=== THÊM HỘI VIÊN THÀNH CÔNG ===\nMã hội viên: ${memberCode}\nTên hội viên: ${fullName}\nGói tập: ${packageName}\nTuổi: ${age}\nSố tháng đăng ký: ${monthCount}`;
  
  console.log(invoice);
  alert(invoice);
};

const updateMember = () => {
  let rawCode = prompt("Nhập mã hội viên cần cập nhật:");
  if (rawCode === null) {
    console.log("Đã hủy cập nhật.");
    return;
  }

  let code = rawCode.trim().toUpperCase();
  let index = findMemberIndex(code);

  if (index === -1) {
    let msg = `Không tìm thấy hội viên có mã ${code}`;
    console.log(msg);
    alert(msg);
    return;
  }

  let currentMember = members[index];

  let newAge = inputPositiveInteger(`Đang cập nhật mã ${code}. Nhập tuổi mới:`);
  if (newAge === null) {
    let msg = `Đã hủy cập nhật cho mã ${code}.`;
    console.log(msg);
    alert(msg);
    return;
  }

  let newMonthCount = inputPositiveInteger(`Đang cập nhật mã ${code}. Nhập số tháng đăng ký mới:`);
  if (newMonthCount === null) {
    let msg = `Đã hủy cập nhật cho mã ${code}.`;
    console.log(msg);
    alert(msg);
    return;
  }

  currentMember.age = newAge;
  currentMember.monthCount = newMonthCount;

  let resultMsg = `Cập nhật thành công mã ${code}!\nTuổi mới: ${newAge}\nSố tháng đăng ký mới: ${newMonthCount}`;
  console.log(resultMsg);
  alert(resultMsg);
};

const deleteMember = () => {
  let rawCode = prompt("Nhập mã hội viên cần xóa:");
  if (rawCode === null) {
    console.log("Đã hủy thao tác xóa.");
    return;
  }

  let code = rawCode.trim().toUpperCase();
  let index = findMemberIndex(code);

  if (index === -1) {
    let msg = `Không tìm thấy hội viên có mã ${code}`;
    console.log(msg);
    alert(msg);
    return;
  }

  let confirmDel = prompt(`Tìm thấy hội viên "${members[index].fullName}". Bạn có chắc chắn muốn xóa không? Nhập 'Y' / 'Yes' hoặc 'N' / 'No':`);
  if (confirmDel === null) {
    let msg = `Đã hủy thao tác xóa, còn ${members.length} hội viên`;
    console.log(msg);
    alert(msg);
    return;
  }

  let trimmedConfirm = confirmDel.trim().toLowerCase();
  if (trimmedConfirm === "y" || trimmedConfirm === "yes") {
    members.splice(index, 1);
    let successMsg = `Xóa thành công, còn ${members.length} hội viên`;
    console.log(successMsg);
    alert(successMsg);
  } else {
    let msg = `Đã hủy thao tác xóa, còn ${members.length} hội viên`;
    console.log(msg);
    alert(msg);
  }
};

const searchMemberByPackage = () => {
  let keywordInput = prompt("Nhập từ khóa gói tập cần tìm:");
  if (keywordInput === null || keywordInput.trim() === "") {
    let msg = "Chưa nhập từ khóa tìm kiếm";
    console.log(msg);
    alert(msg);
    return;
  }

  let keyword = keywordInput.trim().toLowerCase();
  let foundList = [];

  for (let i = 0; i < members.length; i++) {
    if (members[i].packageName.toLowerCase().includes(keyword)) {
      foundList.push(members[i]);
    }
  }

  if (foundList.length === 0) {
    let msg = "Không tìm thấy hội viên phù hợp";
    console.log(msg);
    alert(msg);
    return;
  }

  let resultText = `=== KẾT QUẢ TÌM KIẾM (${foundList.length} kết quả) ===\n`;
  for (let i = 0; i < foundList.length; i++) {
    let item = foundList[i];
    resultText += `${i + 1}. Mã: ${item.memberCode} | Tên: ${item.fullName} | Gói: ${item.packageName} | Tháng: ${item.monthCount}\n`;
  }
  
  console.log(resultText);
  alert(resultText);
};

const printSummaryReport = () => {
  console.log("===============================================");
  console.log("BÁO CÁO TỔNG KẾT HỘI VIÊN");
  console.log("===============================================");

  if (members.length === 0) {
    console.log("Chưa có hội viên nào");
    alert("BÁO CÁO TỔNG KẾT:\nChưa có hội viên nào");
    return;
  }

  let totalMembers = members.length;
  let totalMonths = 0;
  let oldestMember = members[0];

  for (let i = 0; i < members.length; i++) {
    let current = members[i];
    totalMonths += current.monthCount;
    if (current.age > oldestMember.age) {
      oldestMember = current;
    }
  }

  console.log(`Tổng số hội viên       : ${totalMembers}`);
  console.log(`Tổng số tháng đăng ký  : ${totalMonths}`);
  console.log(`Hội viên lớn tuổi nhất : ${oldestMember.fullName} (${oldestMember.age} tuổi)`);
  console.log("================================================");

  let reportAlert = `==============================================\nBÁO CÁO TỔNG KẾT HỘI VIÊN\n==============================================\nTổng số hội viên: ${totalMembers}\nTổng số tháng đăng ký: ${totalMonths}\nHội viên lớn tuổi nhất: ${oldestMember.fullName} (${oldestMember.age} tuổi)\n==================================================`;
  alert(reportAlert);
};

const menuApp = () => {
  let choice;
  do {
    choice = +prompt(promptStr);

    if (isNaN(choice)) {
      choice = -1;
      alert("Lựa chọn không hợp lệ! Vui lòng chỉ nhập số từ 0 đến 5.");
      continue;
    }

    switch (choice) {
      case 1:
        displayMembers(members);
        break;
      case 2:
        addNewMember();
        break;
      case 3:
        updateMember();
        break;
      case 4:
        deleteMember();
        break;
      case 5:
        searchMemberByPackage();
        break;
      case 0:
        alert("Thoat chuong trinh");
        printSummaryReport();
        break;
      default:
        alert("Khong hop le!Moi chon lai");
        break;
    }
  } while (choice !== 0);
};

menuApp();