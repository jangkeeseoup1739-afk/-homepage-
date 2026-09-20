import React, { useState } from 'react';
import { Star, MessageSquare, ThumbsUp, ShieldCheck, Plus, CheckCircle, Heart, Award } from 'lucide-react';
import { ReviewItem } from '../types';

interface ReviewSectionProps {
  reviews: ReviewItem[];
  onAddReview: (review: Omit<ReviewItem, 'id' | 'date' | 'verifiedVisit' | 'likes'>) => void;
}

export const ReviewSection: React.FC<ReviewSectionProps> = ({ reviews, onAddReview }) => {
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [authorName, setAuthorName] = useState('');
  const [rating, setRating] = useState(5);
  const [treatment, setTreatment] = useState('열펌 (디지털,셋팅)');
  const [comment, setComment] = useState('');
  const [submittedMessage, setSubmittedMessage] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !comment.trim()) return;

    onAddReview({
      author: `${authorName} 고객님`,
      rating,
      treatment,
      comment
    });

    setAuthorName('');
    setComment('');
    setSubmittedMessage(true);
    setTimeout(() => {
      setSubmittedMessage(false);
      setIsWriteModalOpen(false);
    }, 1500);
  };

  const averageRating = (
    reviews.reduce((acc, r) => acc + r.rating, 0) / (reviews.length || 1)
  ).toFixed(1);

  return (
    <section id="reviews" className="py-20 bg-[#121316] border-b border-[#252833] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#20222a] border border-[#d4af37]/30 text-xs text-[#d4af37] mb-3">
              <Star className="w-3.5 h-3.5 fill-[#d4af37]" />
              <span className="font-semibold">REAL CUSTOMER REVIEWS</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif-luxury font-bold text-white tracking-tight">
              고객 만족 후기
            </h2>
            <p className="text-sm sm:text-base text-[#cbd2e1] mt-2">
              이수목헤어스토리를 직접 다녀가신 고객님들의 진솔한 방문 리뷰입니다.
            </p>
          </div>

          <button
            onClick={() => setIsWriteModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#20232c] hover:bg-[#282c38] text-xs sm:text-sm font-bold text-[#f7e7b4] border border-[#d4af37]/50 transition-colors w-fit shadow"
          >
            <Plus className="w-4 h-4 text-[#d4af37]" />
            <span>방문 후기 작성하기</span>
          </button>
        </div>

        {/* Rating Summary Banner */}
        <div className="rounded-2xl p-6 sm:p-8 bg-[#171922] border border-[#2b2e3a] grid grid-cols-1 md:grid-cols-4 gap-6 items-center mb-10 shadow-lg">
          <div className="text-center md:border-r border-[#2b2e3a] md:pr-6 space-y-1">
            <span className="text-4xl sm:text-5xl font-serif-luxury font-bold text-[#d4af37]">
              {averageRating}
            </span>
            <div className="flex justify-center gap-1 text-[#d4af37] py-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#d4af37]" />
              ))}
            </div>
            <p className="text-xs sm:text-sm text-[#cbd2e1] font-semibold">네이버 & 매장 누적 만족도</p>
          </div>

          <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-3.5 rounded-xl bg-[#1f222c] border border-[#2e323e]">
              <span className="text-xs sm:text-sm text-[#cbd2e1] font-medium">천연 제품 두피 자극 제로</span>
              <p className="text-xl font-bold text-white mt-1">99.8%</p>
              <div className="w-full bg-[#2c303c] h-2 rounded-full mt-2 overflow-hidden">
                <div className="bg-[#d4af37] h-full rounded-full w-[99.8%]" />
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#1f222c] border border-[#2e323e]">
              <span className="text-xs sm:text-sm text-[#cbd2e1] font-medium">1:1 전담 시술 만족도</span>
              <p className="text-xl font-bold text-white mt-1">100%</p>
              <div className="w-full bg-[#2c303c] h-2 rounded-full mt-2 overflow-hidden">
                <div className="bg-[#d4af37] h-full rounded-full w-[100%]" />
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#1f222c] border border-[#2e323e]">
              <span className="text-xs sm:text-sm text-[#cbd2e1] font-medium">재방문 및 추천 의사</span>
              <p className="text-xl font-bold text-white mt-1">98.9%</p>
              <div className="w-full bg-[#2c303c] h-2 rounded-full mt-2 overflow-hidden">
                <div className="bg-[#d4af37] h-full rounded-full w-[98.9%]" />
              </div>
            </div>
          </div>
        </div>

        {/* Reviews List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="rounded-2xl p-6 bg-[#171922] border border-[#2b2e3a] hover:border-[#424759] transition-colors space-y-4 flex flex-col justify-between shadow-md"
            >
              <div className="space-y-3">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-[#252833] border border-[#3e4354] flex items-center justify-center text-sm font-bold text-[#f7e7b4]">
                      {rev.author.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                        {rev.author}
                        {rev.verifiedVisit && (
                          <span className="inline-flex items-center gap-1 text-xs text-[#5eead4] bg-[#132a26] px-2 py-0.5 rounded font-medium border border-[#5eead4]/30">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            네이버 방문 인증
                          </span>
                        )}
                      </h4>
                      <span className="text-xs text-[#cbd2e1] font-medium">{rev.date}</span>
                    </div>
                  </div>

                  <div className="flex gap-0.5 text-[#d4af37]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#d4af37]" />
                    ))}
                  </div>
                </div>

                {/* Treatment Tag */}
                <div className="inline-block px-3 py-1 rounded bg-[#20232c] text-xs text-[#f7e7b4] font-bold border border-[#373c4c]">
                  시술: {rev.treatment}
                </div>

                {/* Comment Text */}
                <p className="text-sm text-white leading-relaxed font-normal">
                  {rev.comment}
                </p>
              </div>

              {/* Owner's reply if exists */}
              {rev.replyFromOwner && (
                <div className="mt-3 p-3.5 rounded-xl bg-[#1f222c] border-l-2 border-[#d4af37] text-xs sm:text-sm text-[#cbd2e1] space-y-1">
                  <span className="font-bold text-[#f7e7b4] flex items-center gap-1.5 text-xs">
                    <Heart className="w-3.5 h-3.5 text-[#d4af37] fill-[#d4af37]" />
                    원장 이수목의 답글
                  </span>
                  <p className="leading-relaxed">{rev.replyFromOwner}</p>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>

      {/* Review Write Modal */}
      {isWriteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-[#181a22] rounded-2xl border border-[#d4af37]/40 p-6 space-y-5 shadow-2xl">
            <h3 className="text-lg font-serif-luxury font-bold text-white">
              소중한 방문 후기 작성
            </h3>

            {submittedMessage ? (
              <div className="py-8 text-center space-y-2">
                <CheckCircle className="w-10 h-10 text-[#d4af37] mx-auto animate-bounce" />
                <p className="text-sm font-semibold text-white">후기가 정상 등록되었습니다!</p>
                <p className="text-xs text-[#8c91a0]">이수목 원장에게 큰 힘이 됩니다. 감사합니다.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#b0b4c2] mb-1">
                    고객명 (성함 또는 닉네임)
                  </label>
                  <input
                    type="text"
                    required
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="예: 김민지"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#20222b] border border-[#303340] text-sm text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#b0b4c2] mb-1">
                    시술 받으신 메뉴
                  </label>
                  <select
                    value={treatment}
                    onChange={(e) => setTreatment(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#20222b] border border-[#303340] text-sm text-white focus:outline-none focus:border-[#d4af37]"
                  >
                    <option value="열펌 (디지털,셋팅)">열펌 (디지털,셋팅)</option>
                    <option value="열펌 (매직,볼륨 매직)">열펌 (매직,볼륨 매직)</option>
                    <option value="열펌 (매직셋팅)">열펌 (매직셋팅)</option>
                    <option value="링거펌 (모류교정)">링거펌 (모류교정 & 뿌리볼륨)</option>
                    <option value="펌 (일반)">펌 (일반)</option>
                    <option value="커트 (여자)">커트 (여자)</option>
                    <option value="커트 (남자)">커트 (남자)</option>
                    <option value="펌 (남자)">펌 (남자)</option>
                    <option value="스타일링 & 두피케어">스타일링 & 두피케어</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#b0b4c2] mb-1">
                    만족도 별점
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        className="p-1 text-[#d4af37] focus:outline-none"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= rating ? 'fill-[#d4af37]' : 'text-[#3e424f]'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#b0b4c2] mb-1">
                    솔직한 후기 내용
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="원장님의 1:1 맞춤 케어, 천연 제품 느낌, 주차 편의성 등 솔직한 경험을 공유해주세요."
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#20222b] border border-[#303340] text-sm text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-3 rounded-lg bg-[#d4af37] text-[#121316] font-bold text-sm hover:brightness-105 active:scale-95 transition-all"
                  >
                    후기 등록 완료
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsWriteModalOpen(false)}
                    className="px-4 py-3 rounded-lg bg-[#252833] text-[#b0b4c2] hover:text-white text-xs font-semibold"
                  >
                    취소
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
