export class VisualEffects {
  static createConfetti(count: number = 50) {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f7b731', '#5f27cd', '#00d2d3', '#ff9ff3', '#54a0ff'];
    
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.width = Math.random() * 10 + 5 + 'px';
        confetti.style.height = confetti.style.width;
        confetti.style.borderRadius = '50%';
        confetti.style.animationDelay = Math.random() * 0.5 + 's';
        confetti.style.animationDuration = Math.random() * 2 + 2 + 's';
        
        document.body.appendChild(confetti);
        
        setTimeout(() => {
          if (confetti.parentNode) {
            confetti.parentNode.removeChild(confetti);
          }
        }, 5000);
      }, i * 50);
    }
  }

  static createParticleBurst(x: number, y: number, color: string = '#4ecdc4') {
    const particleCount = 15;
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle-effect';
      particle.style.position = 'fixed';
      particle.style.left = x + 'px';
      particle.style.top = y + 'px';
      particle.style.width = '6px';
      particle.style.height = '6px';
      particle.style.backgroundColor = color;
      particle.style.borderRadius = '50%';
      particle.style.pointerEvents = 'none';
      particle.style.zIndex = '1000';
      
      const angle = (i / particleCount) * 2 * Math.PI;
      const distance = Math.random() * 50 + 20;
      
      particle.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px)`;
      
      document.body.appendChild(particle);
      
      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      }, 600);
    }
  }

  static createFloatingText(text: string, x: number, y: number, color: string = '#4ecdc4') {
    const floatingText = document.createElement('div');
    floatingText.textContent = text;
    floatingText.className = 'xp-gain-effect';
    floatingText.style.position = 'fixed';
    floatingText.style.left = x + 'px';
    floatingText.style.top = y + 'px';
    floatingText.style.color = color;
    floatingText.style.fontWeight = 'bold';
    floatingText.style.fontSize = '18px';
    floatingText.style.pointerEvents = 'none';
    floatingText.style.zIndex = '1000';
    floatingText.style.textShadow = '1px 1px 2px rgba(0,0,0,0.3)';
    
    document.body.appendChild(floatingText);
    
    setTimeout(() => {
      if (floatingText.parentNode) {
        floatingText.parentNode.removeChild(floatingText);
      }
    }, 1000);
  }

  static createLevelUpNotification(newLevel: number): HTMLDivElement {
    const notification = document.createElement('div');
    notification.className = 'level-up-notification fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50';
    notification.innerHTML = `
      <div class="text-center">
        <div class="text-6xl mb-4 animate-rainbow">🎉</div>
        <div class="text-2xl mb-2">レベルアップ！</div>
        <div class="text-4xl font-bold mb-4">レベル ${newLevel}</div>
        <div class="text-lg opacity-90">おめでとう！新しいレベルに到達しました！</div>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    // Create confetti effect
    this.createConfetti(100);
    
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 3000);
    
    return notification;
  }

  static createBadgeUnlockNotification(badge: { name: string; emoji: string; description: string }): HTMLDivElement {
    const notification = document.createElement('div');
    notification.className = 'badge-unlock-effect fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50';
    notification.innerHTML = `
      <div class="bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-2xl p-6 shadow-2xl max-w-sm">
        <div class="text-center">
          <div class="text-6xl mb-4">${badge.emoji}</div>
          <div class="text-xl font-bold mb-2">新しいバッジ獲得！</div>
          <div class="text-lg font-semibold mb-2">${badge.name}</div>
          <div class="text-sm opacity-90">${badge.description}</div>
        </div>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 2500);
    
    return notification;
  }

  static animateElement(element: HTMLElement, animationClass: string, duration: number = 1000) {
    element.classList.add(animationClass);
    
    setTimeout(() => {
      element.classList.remove(animationClass);
    }, duration);
  }

  static createSuccessFeedback(element: HTMLElement, message: string = '正解！'): HTMLDivElement {
    const feedback = document.createElement('div');
    feedback.className = 'success-feedback absolute top-0 left-0 right-0 mx-auto z-10';
    feedback.style.width = 'fit-content';
    feedback.textContent = message;
    
    element.style.position = 'relative';
    element.appendChild(feedback);
    
    setTimeout(() => {
      if (feedback.parentNode) {
        feedback.parentNode.removeChild(feedback);
      }
    }, 2000);
    
    return feedback;
  }

  static createErrorFeedback(element: HTMLElement, message: string = '間違いです'): HTMLDivElement {
    const feedback = document.createElement('div');
    feedback.className = 'error-feedback absolute top-0 left-0 right-0 mx-auto z-10';
    feedback.style.width = 'fit-content';
    feedback.textContent = message;
    
    element.style.position = 'relative';
    element.appendChild(feedback);
    
    // Shake the parent element
    this.animateElement(element, 'animate-shake', 500);
    
    setTimeout(() => {
      if (feedback.parentNode) {
        feedback.parentNode.removeChild(feedback);
      }
    }, 2000);
    
    return feedback;
  }

  static createPulseEffect(element: HTMLElement, color: string = 'rgb(34, 197, 94)') {
    const originalTransition = element.style.transition;
    const originalBoxShadow = element.style.boxShadow;
    
    element.style.transition = 'all 0.3s ease';
    element.style.boxShadow = `0 0 20px ${color}`;
    
    setTimeout(() => {
      element.style.transition = originalTransition;
      element.style.boxShadow = originalBoxShadow;
    }, 300);
  }

  static createButtonClickEffect(event: React.MouseEvent<HTMLElement>) {
    const button = event.currentTarget as HTMLElement;
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const ripple = document.createElement('div');
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
    ripple.style.transform = 'scale(0)';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.style.width = '20px';
    ripple.style.height = '20px';
    ripple.style.marginLeft = '-10px';
    ripple.style.marginTop = '-10px';
    ripple.style.pointerEvents = 'none';
    ripple.style.animation = 'ripple 0.6s linear';
    
    // Add ripple animation CSS
    if (!document.getElementById('ripple-styles')) {
      const style = document.createElement('style');
      style.id = 'ripple-styles';
      style.textContent = `
        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => {
      if (ripple.parentNode) {
        ripple.parentNode.removeChild(ripple);
      }
    }, 600);
  }

  static createGlowEffect(element: HTMLElement, duration: number = 2000) {
    element.classList.add('animate-glow');
    
    setTimeout(() => {
      element.classList.remove('animate-glow');
    }, duration);
  }

  static createCelebrationSequence(achievements: string[]) {
    // Create multiple celebration effects in sequence
    this.createConfetti(30);
    
    setTimeout(() => {
      achievements.forEach((achievement, index) => {
        setTimeout(() => {
          // Create achievement popup animation
          const popup = document.createElement('div');
          popup.className = 'animate-pop-in fixed top-20 right-4 bg-yellow-100 border-2 border-yellow-300 rounded-lg p-4 shadow-lg z-50';
          popup.innerHTML = `
            <div class="flex items-center gap-3">
              <span class="text-2xl">🏆</span>
              <div>
                <div class="font-bold text-sm">実績解除！</div>
                <div class="text-xs">${achievement}</div>
              </div>
            </div>
          `;
          
          document.body.appendChild(popup);
          
          setTimeout(() => {
            if (popup.parentNode) {
              popup.parentNode.removeChild(popup);
            }
          }, 2000);
        }, index * 500);
      });
    }, 500);
  }
}