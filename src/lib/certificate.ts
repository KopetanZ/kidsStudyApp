import { UserProgress, Level } from '@/types';

export interface Certificate {
  id: string;
  type: 'level_completion' | 'perfect_score' | 'streak_achievement' | 'badge_collection' | 'subject_mastery';
  title: string;
  description: string;
  studentName: string;
  earnedDate: Date;
  level?: string;
  subject?: string;
  score?: number;
  streak?: number;
  badgeCount?: number;
  template: 'gold' | 'silver' | 'bronze' | 'special';
}

export class CertificateManager {
  static generateCertificate(
    type: Certificate['type'],
    progress: UserProgress,
    data?: {
      level?: Level;
      score?: number;
      streak?: number;
      subject?: string;
      studentName?: string;
    }
  ): Certificate {
    const studentName = data?.studentName || 'がんばりやさん';
    const earnedDate = new Date();
    
    switch (type) {
      case 'level_completion':
        return {
          id: `cert-level-${Date.now()}`,
          type,
          title: `${data?.level?.name} 修了証`,
          description: `${data?.level?.name}を見事にクリアしました！`,
          studentName,
          earnedDate,
          level: data?.level?.name,
          subject: data?.level?.subjectId,
          score: data?.score,
          template: this.getTemplateByDifficulty(data?.level?.difficulty || 1)
        };
        
      case 'perfect_score':
        return {
          id: `cert-perfect-${Date.now()}`,
          type,
          title: 'パーフェクト賞',
          description: '全ての問題に正解しました！完璧です！',
          studentName,
          earnedDate,
          score: data?.score,
          template: 'gold'
        };
        
      case 'streak_achievement':
        return {
          id: `cert-streak-${Date.now()}`,
          type,
          title: `${data?.streak}日連続学習賞`,
          description: `${data?.streak}日間連続で学習を続けました！`,
          studentName,
          earnedDate,
          streak: data?.streak,
          template: data!.streak >= 7 ? 'gold' : data!.streak >= 3 ? 'silver' : 'bronze'
        };
        
      case 'badge_collection':
        return {
          id: `cert-badges-${Date.now()}`,
          type,
          title: `バッジコレクター`,
          description: `${progress.badges.length}個のバッジを集めました！`,
          studentName,
          earnedDate,
          badgeCount: progress.badges.length,
          template: progress.badges.length >= 10 ? 'gold' : progress.badges.length >= 5 ? 'silver' : 'bronze'
        };
        
      case 'subject_mastery':
        return {
          id: `cert-mastery-${Date.now()}`,
          type,
          title: `${data?.subject} マスター`,
          description: `${data?.subject}の全レベルを制覇しました！`,
          studentName,
          earnedDate,
          subject: data?.subject,
          template: 'special'
        };
        
      default:
        throw new Error(`Unknown certificate type: ${type}`);
    }
  }

  private static getTemplateByDifficulty(difficulty: number): Certificate['template'] {
    if (difficulty >= 4) return 'gold';
    if (difficulty >= 2) return 'silver';
    return 'bronze';
  }

  static generateCertificateHTML(certificate: Certificate): string {
    const templateColors = {
      gold: { primary: '#fbbf24', secondary: '#f59e0b', accent: '#d97706' },
      silver: { primary: '#e5e7eb', secondary: '#d1d5db', accent: '#9ca3af' },
      bronze: { primary: '#d2691e', secondary: '#cd853f', accent: '#8b4513' },
      special: { primary: '#8b5cf6', secondary: '#7c3aed', accent: '#6d28d9' }
    };

    const colors = templateColors[certificate.template];
    const today = certificate.earnedDate.toLocaleDateString('ja-JP');

    return `
      <div id="certificate-${certificate.id}" style="
        width: 800px;
        height: 600px;
        background: linear-gradient(135deg, ${colors.primary}, ${colors.secondary});
        border: 8px solid ${colors.accent};
        border-radius: 20px;
        padding: 40px;
        font-family: 'Comic Sans MS', cursive;
        color: #1f2937;
        position: relative;
        box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        margin: 20px auto;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        background-image: 
          radial-gradient(circle at 20% 20%, rgba(255,255,255,0.3) 2px, transparent 2px),
          radial-gradient(circle at 80% 80%, rgba(255,255,255,0.3) 2px, transparent 2px),
          radial-gradient(circle at 40% 60%, rgba(255,255,255,0.2) 3px, transparent 3px);
      ">
        <!-- Decorative corners -->
        <div style="position: absolute; top: 20px; left: 20px; width: 60px; height: 60px; border-top: 6px solid ${colors.accent}; border-left: 6px solid ${colors.accent};"></div>
        <div style="position: absolute; top: 20px; right: 20px; width: 60px; height: 60px; border-top: 6px solid ${colors.accent}; border-right: 6px solid ${colors.accent};"></div>
        <div style="position: absolute; bottom: 20px; left: 20px; width: 60px; height: 60px; border-bottom: 6px solid ${colors.accent}; border-left: 6px solid ${colors.accent};"></div>
        <div style="position: absolute; bottom: 20px; right: 20px; width: 60px; height: 60px; border-bottom: 6px solid ${colors.accent}; border-right: 6px solid ${colors.accent};"></div>
        
        <!-- Header -->
        <div style="text-align: center; margin-bottom: 30px;">
          <div style="font-size: 48px; margin-bottom: 10px;">
            ${certificate.template === 'gold' ? '🏆' : certificate.template === 'silver' ? '🥈' : certificate.template === 'bronze' ? '🥉' : '⭐'}
          </div>
          <h1 style="font-size: 36px; margin: 0; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">
            修了証明書
          </h1>
          <div style="font-size: 18px; margin-top: 10px; opacity: 0.8;">
            Certificate of Achievement
          </div>
        </div>

        <!-- Content -->
        <div style="text-align: center; flex-grow: 1; display: flex; flex-direction: column; justify-content: center;">
          <div style="font-size: 24px; margin-bottom: 20px;">
            この証明書は以下のことを証明します
          </div>
          
          <div style="
            background: rgba(255,255,255,0.9);
            border-radius: 15px;
            padding: 30px;
            margin: 20px 0;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
          ">
            <div style="font-size: 32px; font-weight: bold; color: ${colors.accent}; margin-bottom: 15px;">
              ${certificate.studentName}
            </div>
            <div style="font-size: 28px; font-weight: bold; margin-bottom: 10px;">
              ${certificate.title}
            </div>
            <div style="font-size: 20px; line-height: 1.5;">
              ${certificate.description}
            </div>
            
            ${certificate.score ? `
              <div style="margin-top: 15px; font-size: 18px; color: ${colors.accent};">
                スコア: ${certificate.score}点
              </div>
            ` : ''}
            
            ${certificate.streak ? `
              <div style="margin-top: 15px; font-size: 18px; color: ${colors.accent};">
                連続学習記録: ${certificate.streak}日
              </div>
            ` : ''}
          </div>
        </div>

        <!-- Footer -->
        <div style="text-align: center; margin-top: 30px;">
          <div style="font-size: 18px; margin-bottom: 10px;">
            ${today}
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div style="text-align: center;">
              <div style="border-top: 2px solid ${colors.accent}; width: 150px; margin-bottom: 5px;"></div>
              <div style="font-size: 14px;">小学生学習アプリ</div>
            </div>
            <div style="font-size: 48px;">🎓</div>
            <div style="text-align: center;">
              <div style="border-top: 2px solid ${colors.accent}; width: 150px; margin-bottom: 5px;"></div>
              <div style="font-size: 14px;">がんばった証</div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  static async downloadCertificate(certificate: Certificate): Promise<void> {
    if (typeof window === 'undefined') return;

    try {
      // Create a temporary container
      const container = document.createElement('div');
      container.innerHTML = this.generateCertificateHTML(certificate);
      container.style.position = 'absolute';
      container.style.left = '-9999px';
      document.body.appendChild(container);

      // Use html2canvas if available, otherwise show print dialog
      if ((window as any).html2canvas) {
        const canvas = await (window as any).html2canvas(container.firstElementChild);
        const link = document.createElement('a');
        link.download = `certificate-${certificate.id}.png`;
        link.href = canvas.toDataURL();
        link.click();
      } else {
        // Fallback: open in new window for printing
        const printWindow = window.open('', '_blank');
        if (printWindow) {
          printWindow.document.write(`
            <html>
              <head>
                <title>${certificate.title}</title>
                <style>
                  body { margin: 0; padding: 20px; background: #f0f0f0; }
                  @media print { body { background: white; } }
                </style>
              </head>
              <body>
                ${this.generateCertificateHTML(certificate)}
              </body>
            </html>
          `);
          printWindow.document.close();
        }
      }

      // Clean up
      document.body.removeChild(container);
    } catch (error) {
      console.error('Error downloading certificate:', error);
    }
  }

  static showCertificateModal(certificate: Certificate): void {
    if (typeof window === 'undefined') return;

    // Create modal
    const modal = document.createElement('div');
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.8);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 10000;
      padding: 20px;
      box-sizing: border-box;
    `;

    modal.innerHTML = `
      <div style="
        background: white;
        border-radius: 20px;
        padding: 20px;
        max-width: 90vw;
        max-height: 90vh;
        overflow: auto;
        position: relative;
      ">
        <button onclick="this.closest('.modal').remove()" style="
          position: absolute;
          top: 10px;
          right: 10px;
          background: #ef4444;
          color: white;
          border: none;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          font-size: 20px;
          cursor: pointer;
          z-index: 1;
        ">×</button>
        ${this.generateCertificateHTML(certificate)}
        <div style="text-align: center; margin-top: 20px;">
          <button onclick="window.certificateManager.downloadCertificate(window.currentCertificate)" style="
            background: #22c55e;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 10px;
            font-size: 16px;
            cursor: pointer;
            margin-right: 10px;
          ">📥 ダウンロード</button>
          <button onclick="this.closest('.modal').remove()" style="
            background: #6b7280;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 10px;
            font-size: 16px;
            cursor: pointer;
          ">閉じる</button>
        </div>
      </div>
    `;

    modal.className = 'modal';
    
    // Store certificate for download
    (window as any).currentCertificate = certificate;
    (window as any).certificateManager = this;

    document.body.appendChild(modal);

    // Close on background click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.remove();
      }
    });
  }
}