// 한국 음력 ↔ 양력 변환.
//
// 음력 날짜는 천문 관측(삭·절기)으로 정해지므로 수식으로 계산할 수 없고,
// 한국천문연구원(KASI)이 확정한 값을 표로 들고 있어야 합니다. 아래 표는
// korean_lunar_calendar(KASI 자료 기반)에서 뽑아낸 뒤, 1912~2049년의 음력
// 초하루 1,718개가 모두 한국 표준시(UTC+9) 기준 삭(new moon)이 든 날과
// 일치하는지 천문 계산(pyephem)으로 교차 검증했습니다.
//
// 한국 음력은 중국 음력과 다릅니다. 삭의 시각을 각자의 표준시로 판정하기
// 때문인데, 예를 들어 1988년 설날은 한국이 2월 18일, 중국이 2월 17일입니다
// (삭: 1988-02-17 15:54 UTC = 한국 02-18 00:54, 중국 02-17 23:54).
// 이 표는 한국 기준입니다.
//
// 표 형식: 한 해당 16진수 5자리.
//   상위 비트(값 >> 13) = 윤달이 든 月 (0이면 윤달 없음)
//   하위 13비트         = 그 해 각 달의 크기. 달 순서대로 1이면 30일(대월),
//                         0이면 29일(소월). 윤달은 같은 달 바로 뒤에 들어갑니다.
// 각 해의 총일수를 더하면 다음 해 설날까지의 간격과 정확히 맞습니다(검증 완료).

const LUNAR_TABLE =
  '116d20075200ea50b64a0064b00a9b095560056a00b5905752' + // 1900-1909
  '007520db2500b2500a4b0b29b00aad0056a04b6900ba90fb52' + // 1910-1919
  '00d9200d250ba4d00956002b5095ad006d400da905d9200e92' + // 1920-1929
  '0cd260052700a570b2b600ada006d406ea9007490f69300a93' + // 1930-1939
  '0052b0ca5b0096d00b6a09b5400ba400b4905a9300a950f52b' + // 1940-1949
  '0052d00aad0b56a00db200da407d4900d4a11a9500a9600556' + // 1950-1959
  '0cab500ad5006d208ea500ea500e4a06c9600a9b0f5560056a' + // 1960-1969
  '00b590b75200752007250964b00a4b112ab002ad0056b0cb69' + // 1970-1979
  '00da900d9209b2500d2515a4d00a56002b60d5ad006d400da9' + // 1980-1989
  '0bd9200e9200d2606a5600a57112b600b5a006d40aec900749' + // 1990-1999
  '00693095270052b00a5b0555a0036a0fb5500ba400b490ba93' + // 2000-2009
  '00a950052d06a5d00aad135aa005d200da50bd4a00d4a00a95' + // 2010-2019
  '0952d0055600ab5055aa006d20cea500ea500e4a0ac9600c9b' + // 2020-2029
  '0055a06ad500b69177520075200b250d64b00a4b004ab0a55b' + // 2030-2039
  '0056d00b6905b5200d920fd2500d2500a4d0b4ad002b6005b5';  // 2040-2049

/** 표가 담고 있는 첫 해. */
export const LUNAR_MIN_YEAR = 1900;
/** 표가 담고 있는 마지막 해. */
export const LUNAR_MAX_YEAR = 2049;

/** 음력 1900년 1월 1일에 해당하는 양력 날짜(UTC 기준 밀리초). */
const BASE_UTC = Date.UTC(1900, 0, 31);
const DAY_MS = 86400000;

function yearValue(year: number): number {
  return parseInt(LUNAR_TABLE.slice((year - LUNAR_MIN_YEAR) * 5, (year - LUNAR_MIN_YEAR) * 5 + 5), 16);
}

export function isLunarYearSupported(year: number): boolean {
  return Number.isInteger(year) && year >= LUNAR_MIN_YEAR && year <= LUNAR_MAX_YEAR;
}

/** 그 해에 든 윤달의 月. 윤달이 없으면 0. */
export function getLeapMonth(year: number): number {
  if (!isLunarYearSupported(year)) return 0;
  return yearValue(year) >> 13;
}

/** 그 해 달의 개수(윤달이 있으면 13). */
function monthCount(year: number): number {
  return getLeapMonth(year) ? 13 : 12;
}

/** 그 해 달 순서에서 해당 달이 몇 번째인지. 없는 달이면 -1. */
function monthIndex(year: number, month: number, isLeapMonth: boolean): number {
  if (!isLunarYearSupported(year) || month < 1 || month > 12) return -1;
  const leap = getLeapMonth(year);
  if (isLeapMonth) return leap === month ? month : -1;
  return month - 1 + (leap > 0 && month > leap ? 1 : 0);
}

function daysAtIndex(year: number, index: number): number {
  return (yearValue(year) & 0x1fff) & (1 << index) ? 30 : 29;
}

/** 음력 한 달의 일수(29 또는 30). 없는 달이면 0. */
export function getLunarMonthDays(year: number, month: number, isLeapMonth: boolean): number {
  const index = monthIndex(year, month, isLeapMonth);
  return index < 0 ? 0 : daysAtIndex(year, index);
}

function yearDays(year: number): number {
  let total = 0;
  const count = monthCount(year);
  for (let i = 0; i < count; i++) total += daysAtIndex(year, i);
  return total;
}

// 기준 해부터 각 해 시작까지 누적 일수. 최초 호출 때 한 번만 만듭니다.
let cumulativeDays: number[] | null = null;
function daysBeforeYear(year: number): number {
  if (!cumulativeDays) {
    cumulativeDays = [0];
    for (let y = LUNAR_MIN_YEAR; y < LUNAR_MAX_YEAR; y++) {
      cumulativeDays.push(cumulativeDays[cumulativeDays.length - 1] + yearDays(y));
    }
  }
  return cumulativeDays[year - LUNAR_MIN_YEAR];
}

export interface SolarDate {
  year: number;
  month: number;
  day: number;
}

/**
 * 음력 날짜를 양력으로 바꿉니다. 표에 없는 해이거나 실제로 존재하지 않는
 * 날짜(예: 29일까지인 달의 30일, 윤달이 없는 해의 윤달)면 null.
 */
export function lunarToSolar(
  year: number,
  month: number,
  day: number,
  isLeapMonth: boolean,
): SolarDate | null {
  const index = monthIndex(year, month, isLeapMonth);
  if (index < 0) return null;
  if (!Number.isInteger(day) || day < 1 || day > daysAtIndex(year, index)) return null;

  let offset = daysBeforeYear(year) + (day - 1);
  for (let i = 0; i < index; i++) offset += daysAtIndex(year, i);

  const date = new Date(BASE_UTC + offset * DAY_MS);
  return {year: date.getUTCFullYear(), month: date.getUTCMonth() + 1, day: date.getUTCDate()};
}
