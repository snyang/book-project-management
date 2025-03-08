// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded "><a href="ch01-00-getting-started.html"><strong aria-hidden="true">1.</strong> 入门指南</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="ch01-01-professionalism.html"><strong aria-hidden="true">1.1.</strong> 专业主义</a></li><li class="chapter-item expanded "><a href="ch01-02-core-elements.html"><strong aria-hidden="true">1.2.</strong> 核心三要素：角色，流程，产出物</a></li></ol></li><li class="chapter-item expanded "><a href="ch02-00-role.html"><strong aria-hidden="true">2.</strong> 角色</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="ch02-01-team-roles.html"><strong aria-hidden="true">2.1.</strong> 软件项目团队的角色</a></li><li class="chapter-item expanded "><a href="ch02-02-team-evolution.html"><strong aria-hidden="true">2.2.</strong> 软件项目团队的规模和角色配置</a></li></ol></li><li class="chapter-item expanded "><a href="ch03-00-process.html"><strong aria-hidden="true">3.</strong> 流程</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="ch03-01-process-main.html"><strong aria-hidden="true">3.1.</strong> 主流程</a></li><li class="chapter-item expanded "><a href="ch03-02-process-doc-review.html"><strong aria-hidden="true">3.2.</strong> 文档审核流程</a></li><li class="chapter-item expanded "><a href="ch03-03-process-estimation.html"><strong aria-hidden="true">3.3.</strong> 项目估算流程</a></li><li class="chapter-item expanded "><a href="ch03-04-process-code-review.html"><strong aria-hidden="true">3.4.</strong> 代码审核流程</a></li><li class="chapter-item expanded "><a href="ch03-05-process-freeze-code-review.html"><strong aria-hidden="true">3.5.</strong> 代码审核流程（代码冻结后）</a></li><li class="chapter-item expanded "><a href="ch03-06-process-feature-management.html"><strong aria-hidden="true">3.6.</strong> 功能开发流程</a></li><li class="chapter-item expanded "><a href="ch03-07-process-defect-management.html"><strong aria-hidden="true">3.7.</strong> 缺陷管理流程</a></li></ol></li><li class="chapter-item expanded "><a href="ch04-00-artifact.html"><strong aria-hidden="true">4.</strong> 产出物</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="ch04-01-artifact-list.html"><strong aria-hidden="true">4.1.</strong> 产出物列表</a></li></ol></li><li class="chapter-item expanded "><a href="ch05-00-meeting.html"><strong aria-hidden="true">5.</strong> 会议</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="ch05-01-daily-meeting.html"><strong aria-hidden="true">5.1.</strong> 站立会议</a></li><li class="chapter-item expanded "><a href="ch05-02-week-meeting.html"><strong aria-hidden="true">5.2.</strong> 每周会议</a></li><li class="chapter-item expanded "><a href="ch05-03-iterator-meeting.html"><strong aria-hidden="true">5.3.</strong> 迭代会议</a></li><li class="chapter-item expanded "><a href="ch05-04-milestone-meeting.html"><strong aria-hidden="true">5.4.</strong> 里程碑会议</a></li><li class="chapter-item expanded "><a href="ch05-05-project-meeting.html"><strong aria-hidden="true">5.5.</strong> 项目复盘会议</a></li><li class="chapter-item expanded "><a href="ch05-06-demo-meeting.html"><strong aria-hidden="true">5.6.</strong> 演示会议</a></li></ol></li><li class="chapter-item expanded "><a href="ch99-01-todo.html"><strong aria-hidden="true">6.</strong> 下一版的内容</a></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString().split("#")[0];
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
