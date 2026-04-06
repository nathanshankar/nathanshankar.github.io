// Project code strings
const faceGuardCode = `import cv2
import os
import numpy as np
from PIL import Image

def capture_and_train(user_name):
    recognizer = cv2.face.LBPHFaceRecognizer_create()
    detector = cv2.CascadeClassifier("haarcascade_frontalface_default.xml")
    
    # Capture images of user
    camera = cv2.VideoCapture(0)
    count = 0
    while count < 100:
        ret, frame = camera.read()
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        faces = detector.detectMultiScale(gray, 1.3, 5)
        for (x,y,w,h) in faces:
            cv2.rectangle(frame, (x,y), (x+w,y+h), (0,255,0), 2)
            count += 1
            cv2.imwrite(f"dataset/User.{user_name}.{count}.jpg", gray[y:y+h,x:x+w])
        cv2.imshow("Capturing", frame)
        if cv2.waitKey(100) & 0xFF == ord('q'): break
    camera.release()
`;

const aStarCode = `def do_a_star(grid, start, end):
    # Performing the A* algorithm to find the shortest path
    possible_directions = [(1, 0), (-1, 0), (0, 1), (0, -1)]
    visited = set()
    open_list = [Node(start, 0, heuristic(start, end))]

    while open_list:
        current_node = min(open_list, key=lambda n: n.total_cost)
        open_list.remove(current_node)
        
        if current_node.position == end:
            return reconstruct_path(current_node)
            
        visited.add(current_node.position)
        for dx, dy in possible_directions:
            neighbor = (current_node.position[0]+dx, current_node.position[1]+dy)
            if is_valid(neighbor) and neighbor not in visited:
                open_list.append(Node(neighbor, current_node.g+1, h(neighbor, end), current_node))
    return []
`;

const contentData = {
  "about": {
    title: "ABOUT_ME.md",
    path: "~/portfolio/ABOUT_ME.md",
    content: `
      <div class="page-header">
        <h1>About Me</h1>
        <div class="path">~/portfolio/ABOUT_ME.md</div>
      </div>
      <div class="about-content">
        <p>Hey! I'm <strong>Nathan Shankar</strong>. Most people know me as their friendly neighborhood Robotics Engineer turned researcher.</p>
        
        <p>These days, I’m spending my time at the <strong>University of Manchester</strong>, basically trying to make sure the robots we build in the future don't need to carry a torch just to see where they're going in the dark. My PhD is in Mechanical Engineering, and I’m pretty obsessed with autonomous navigation in those "impossible" environments—places where standard cameras just give up.</p>
        
        <p>Before I got into the deep end of PhD research, I did my Master’s here at Manchester (got a Distinction!) on Robotics and my dissertation was on IoT path planner for drones. My whole journey actually started back at VIT where I got my B.Tech in Electrical and Electronics Engineering.</p>
        
        <p>When I’m not in the lab, I’m usually helping out as a Teaching Assistant for the Autonomous Mobile Robots course. It’s a lot of fun, mostly because I get to help students figure out why their robots are spinning in circles when they should be mapping a room.</p>

        <p>I spend most of my time messing with <strong>ROS2</strong>, <strong>SLAM</strong> algorithms, and trying to get <strong>Gazebo</strong> simulations to cooperate. I’m also deep into <strong>AI</strong> and <strong>Computer Vision</strong>, mostly trying to translate what a sensor sees into something a robot can actually use to make a decision.</p>

        <p>Feel free to click through the files on the left to see some of the projects and papers I've been working on!</p>
      </div>
    `
  },
  "leo_rover": {
    title: "leo_rover.py",
    path: "~/portfolio/projects/leo_rover.py",
    content: `
      <div class="page-header">
        <h1>ROS2 Autonomous Frontier Exploration</h1>
        <div class="path">~/portfolio/projects/leo_rover.py</div>
      </div>
      <div class="project-details">
        <div class="tags">
          <span class="tag">ROS2 Humble</span><span class="tag">Python</span><span class="tag">LiDAR</span><span class="tag">SLAM</span>
        </div>
        <p>I developed this autonomous exploration system for the Leo Rover to help it map out unknown areas on its own. It uses frontier-based exploration, which basically means it looks for the boundaries between what it's already mapped and what it hasn't, then decides where to go next. I also integrated a PX-150 manipulator and built a custom PyQt5 interface to control the joints manually when needed.</p>
        <p>This project was particularly challenging because it involved managing high-latency data from multiple sensors while maintaining a clean map. I had to tune the Slam Toolbox parameters extensively to handle the vibrations and movement of the rugged rover platform. The final system was able to navigate autonomously through cluttered environments, updating its map in real-time and identifying the most informative areas for further exploration.</p>
        <h3>Key Features:</h3>
        <ul>
          <li><strong>Autonomous Mapping:</strong> Automatically finds and explores new areas without any human input.</li>
          <li><strong>Sensor Fusion:</strong> Combines data from LiDAR and RealSense cameras for robust navigation and obstacle avoidance.</li>
          <li><strong>Custom Control:</strong> Includes a dedicated UI for controlling the robotic arm joints with precise feedback.</li>
          <li><strong>Navigation Stack:</strong> Integrated Nav2 with custom costmaps to handle rough terrain and dynamic obstacles.</li>
        </ul>
        <p><strong>Repo:</strong> <a href="https://github.com/nathanshankar/leo-rover-autonomous-exploration" target="_blank">leo-rover-autonomous-exploration</a></p>
      </div>
      <div class="retro-computer">
        <div class="retro-monitor">
          <div class="retro-screen-frame">
            <div class="retro-screen">
              <div class="terminal-loader">
                <p class="typing-text">> python3 leo_rover_explore.py</p>
                <p style="margin-top: 10px;">MOUNTING: LIDAR_A2M12</p>
                <p>MAPPING: SLAM_TOOLBOX</p>
                <p>HEURISTIC: FRONTIER_SEARCH</p>
                <p style="margin-top: auto;">EXPLORATION_START</p>
              </div>
              <div class="file-explorer">
                <p style="border-bottom: 1px solid #33ff33; padding-bottom: 5px; margin-bottom: 10px;">Directory: /home/nathan/leo_rover/</p>
                <div class="file-item" onclick="playRetroMedia(this, 'files/nathansleoros2frontierexploration1.mp4', 'video')">
                  <span>[VID]</span> frontier_exploration.mp4
                </div>
                <div class="file-item" onclick="playRetroMedia(this, 'https://sketchfab.com/models/9109770683e043cc9923f4fa62522603/embed?autospin=1&autostart=1&preload=1', 'sketchfab')">
                  <span>[3D]</span> rover_model.obj
                </div>
                <div class="file-item" onclick="playRetroMedia(this, 'files/leo-video.mp4', 'video')">
                  <span>[VID]</span> rover_maneuver.mp4
                </div>
                <div class="file-item" onclick="playRetroMedia(this, 'files/leo-video1.mp4', 'video')">
                  <span>[VID]</span> web_control.mp4
                </div>
                <div class="file-item" onclick="playRetroMedia(this, 'images/leoRover.jpg', 'image')">
                  <span>[IMG]</span> field_test.jpg
                </div>
                <div class="file-item" onclick="playRetroMedia(this, 'images/11.jpg', 'image')">
                  <span>[IMG]</span> full_setup.jpg
                </div>
                <div class="file-item" onclick="playRetroMedia(this, 'images/lr5.jpeg', 'image')">
                  <span>[IMG]</span> hardware_setup.jpeg
                </div>
                <div class="file-item" onclick="playRetroMedia(this, 'images/lr4.jpeg', 'image')">
                  <span>[IMG]</span> chassis_view.jpeg
                </div>
                <div class="file-item" onclick="alert('ROS2 frontier-based autonomous mapping and navigation system for the Leo Rover.')">
                  <span>[TXT]</span> README.txt
                </div>
              </div>
            </div>
          </div>
          <div class="power-button"></div>
        </div>
        <div class="retro-base">
          <div class="vent"></div>
          <div class="vent"></div>
        </div>
      </div>
    `
  },
  "drone_control": {
    title: "drone_sim.cpp",
    path: "~/portfolio/projects/drone_sim.cpp",
    content: `
      <div class="page-header">
        <h1>UAS Position Stabilization & Disturbance Compensation</h1>
        <div class="path">~/portfolio/projects/drone_sim.cpp</div>
      </div>
      <div class="project-details">
        <div class="tags">
          <span class="tag">Python</span><span class="tag">PID Control</span><span class="tag">DOBC</span>
        </div>
        <p>Keeping a drone steady in high winds is tough, so I built this flight control system to handle external disturbances. It uses a Disturbance Observer (DOB) to estimate wind forces in real-time and compensate for them. I also implemented a cascaded PID loop, which makes the attitude adjustments much snappier and keeps the position locked in even when things get gusty.</p>
        <p>The system was tested in simulations where I introduced varied wind profiles and sudden gusts. The DOBC (Disturbance Observer Based Control) showed a significant improvement in tracking accuracy compared to a standard PID controller, reducing error by over 40% in heavy wind scenarios. This makes it ideal for real-world drone missions like parcel delivery or environmental monitoring.</p>
        <h3>Key Features:</h3>
        <ul>
          <li><strong>Wind Compensation:</strong> Real-time estimation and mitigation of environmental disturbances like wind gusts.</li>
          <li><strong>Cascaded Control:</strong> Nested loops for high-frequency attitude and stable position management.</li>
          <li><strong>Robust Stability:</strong> Designed to prevent integral windup and overshoot during rapid corrections in harsh conditions.</li>
          <li><strong>Flight Simulation:</strong> Extensively tested using high-fidelity dynamics models to ensure real-world reliability.</li>
        </ul>
        <p><strong>Repo:</strong> <a href="https://github.com/nathanshankar/drone-control" target="_blank">drone-control</a></p>
      </div>
      <div class="retro-computer">
        <div class="retro-monitor">
          <div class="retro-screen-frame">
            <div class="retro-screen">
              <div class="terminal-loader">
                <p class="typing-text">> ./drone_stabilizer --pid-cascade</p>
                <p style="margin-top: 10px;">ESTIMATING BIAS...</p>
                <p>DOB ACTIVE: WIND_EST_v1.0</p>
                <p>THROTTLE: ARMED</p>
                <p style="margin-top: auto;">STABILIZING...</p>
              </div>
              <div class="file-explorer">
                <p style="border-bottom: 1px solid #33ff33; padding-bottom: 5px; margin-bottom: 10px;">Directory: /home/nathan/drone_control/</p>
                <div class="file-item" onclick="playRetroMedia(this, 'files/drone-1.mp4', 'video')">
                  <span>[VID]</span> stabilization_demo.mp4
                </div>
                <div class="file-item" onclick="playRetroMedia(this, 'https://github.com/nathanshankar/drone-control/assets/66565433/420a624a-620d-4a44-900a-9ef6a6e56c4f', 'video')">
                  <span>[VID]</span> flight_with_wind.mp4
                </div>
                <div class="file-item" onclick="playRetroMedia(this, 'https://github.com/nathanshankar/drone-control/assets/66565433/c26fdb9e-ec11-4855-871f-1565348f2d85', 'video')">
                  <span>[VID]</span> flight_no_wind.mp4
                </div>
                <div class="file-item" onclick="playRetroMedia(this, 'https://github.com/nathanshankar/drone-control/assets/66565433/a3956ae3-2b0c-4d85-8e01-13f3818f1ad4', 'image')">
                  <span>[IMG]</span> block_diagram.png
                </div>
                <div class="file-item" onclick="alert('Disturbance Observer-Based Control (DOBC) for flight stability under varying wind conditions.')">
                  <span>[TXT]</span> controller_specs.txt
                </div>
              </div>
            </div>
          </div>
          <div class="power-button"></div>
        </div>
        <div class="retro-base">
          <div class="vent"></div>
          <div class="vent"></div>
        </div>
      </div>
    `
  },
  "biped_robot": {
    title: "biped_core.h",
    path: "~/portfolio/projects/biped_robot.h",
    content: `
      <div class="page-header">
        <h1>Biped Robot</h1>
        <div class="path">~/portfolio/projects/biped_core.h</div>
      </div>
      <div class="project-details">
        <div class="tags">
          <span class="tag">C++</span><span class="tag">Embedded</span><span class="tag">Kinematics</span>
        </div>
        <p>This was one of my more ambitious hardware projects—a 13-DOF bipedal robot. I focused a lot on the inverse kinematics to get the walking gait looking natural. I also added some high-level modules for facial recognition and voice interaction to give it a bit more personality.</p>
        <p>Solving the IK for 13 joints in real-time on an embedded processor was a significant challenge. I used a Jacobian-based iterative solver that I optimized for performance, allowing for smooth, stable movements. The final robot was capable of walking on flat surfaces, turning, and interacting with its environment using built-in sensors.</p>
        <h3>Key Features:</h3>
        <ul>
          <li><strong>13 Degrees of Freedom:</strong> Enables high-fidelity, human-like movement across the entire frame.</li>
          <li><strong>IK-Based Walking:</strong> Advanced gait generation using real-time inverse kinematics for stability.</li>
          <li><strong>Human Interaction:</strong> Features facial recognition and voice synthesis for more natural engagement.</li>
          <li><strong>Robust Design:</strong> Optimized for stability and durability during continuous operation.</li>
        </ul>
      </div>
      <div class="retro-computer">
        <div class="retro-monitor">
          <div class="retro-screen-frame">
            <div class="retro-screen">
              <div class="terminal-loader">
                <p class="typing-text">> ./biped_core --init-gait</p>
                <p style="margin-top: 10px;">SERVO_CHECK: OK (13/13)</p>
                <p>IK_ENGINE: SOLVING...</p>
                <p>SENSORS: CALIBRATED</p>
                <p style="margin-top: auto;">WALK_SEQUENCE_LOADED</p>
              </div>
              <div class="file-explorer">
                <p style="border-bottom: 1px solid #33ff33; padding-bottom: 5px; margin-bottom: 10px;">Directory: /home/nathan/biped/</p>
                <div class="file-item" onclick="playRetroMedia(this, 'files/biped1_changed.mp4', 'video')">
                  <span>[VID]</span> gait_cycle_v1.mp4
                </div>
                <div class="file-item" onclick="playRetroMedia(this, 'https://sketchfab.com/models/969f322438824d75989a7ffe349ddac3/embed?autospin=1&autostart=1', 'sketchfab')">
                  <span>[3D]</span> biped_3d.obj
                </div>
                <div class="file-item" onclick="playRetroMedia(this, 'files/biped2_changed.mp4', 'video')">
                  <span>[VID]</span> move_test.mp4
                </div>
                <div class="file-item" onclick="alert('13-DOF Bipedal robot core controller with real-time Inverse Kinematics.')">
                  <span>[TXT]</span> hardware_manifest.txt
                </div>
              </div>
            </div>
          </div>
          <div class="power-button"></div>
        </div>
        <div class="retro-base">
          <div class="vent"></div>
          <div class="vent"></div>
        </div>
      </div>
    `
  },
  "faceguard": {
    title: "face_guard.py",
    path: "~/portfolio/projects/face_guard.py",
    content: `
      <div class="page-header">
        <h1>FaceGuard: Real-Time Facial Recognition System</h1>
        <div class="path">~/portfolio/projects/face_guard.py</div>
      </div>
      <div class="project-details">
        <div class="tags">
          <span class="tag">OpenCV</span><span class="tag">Python</span><span class="tag">LBPH</span>
        </div>
        <p>I put together FaceGuard to explore real-time computer vision. It's an end-to-end pipeline where you can capture your own facial data, train a model on the fly, and then use it for live identity validation. It's built on top of OpenCV and uses LBPH for the actual recognition, which works surprisingly well even with limited data.</p>
        <p>The system is designed to be lightweight enough to run on a Raspberry Pi, making it perfect for smart home security or personalized hardware access. I implemented a modular preprocessing stage to handle varying lighting conditions and facial orientations, ensuring reliable performance in different environments. The final product features high-speed inference and a user-friendly interface for adding or removing users from the authorized list.</p>
        <h3>Key Features:</h3>
        <ul>
          <li><strong>Real-Time Pipeline:</strong> Minimal latency from image capture to identity validation for a seamless experience.</li>
          <li><strong>On-the-Fly Training:</strong> Easily add or update facial data without restarting the system.</li>
          <li><strong>High Reliability:</strong> Optimized for low false-positive rates even in challenging lighting conditions.</li>
          <li><strong>Modular Architecture:</strong> Allows for easy swapping of facial recognition algorithms and hardware backends.</li>
        </ul>
        <p><strong>Repo:</strong> <a href="https://github.com/nathanshankar/FaceGuard" target="_blank">FaceGuard</a></p>
      </div>
      <div class="retro-computer">
        <div class="retro-monitor">
          <div class="retro-screen-frame">
            <div class="retro-screen">
              <div class="terminal-loader">
                <p class="typing-text">> python3 faceguard.py --validate</p>
                <p style="margin-top: 10px;">CAMERA: DETECTED</p>
                <p>MODEL: LBPH_CLASSIFIER_v1</p>
                <p>CONFIDENCE: 92.4%</p>
                <p style="margin-top: auto;">SCANNING...</p>
              </div>
              <div class="file-explorer">
                <p style="border-bottom: 1px solid #33ff33; padding-bottom: 5px; margin-bottom: 10px;">Directory: /home/nathan/faceguard/</p>
                <div class="file-item" onclick="playRetroMedia(this, 'files/faceguard_demo.mp4', 'video')">
                  <span>[VID]</span> recognition_demo.mp4
                </div>
                <div class="file-item" onclick="playRetroCode(this, faceGuardCode)">
                  <span>[PY]</span> faceguard.py
                </div>
                <div class="file-item" onclick="playRetroMedia(this, 'images/image15.png', 'image')">
                  <span>[IMG]</span> training_dataset.png
                </div>
                <div class="file-item" onclick="alert('Real-time facial recognition pipeline using LBPH and OpenCV.')">
                  <span>[TXT]</span> model_config.txt
                </div>
              </div>
            </div>
          </div>
          <div class="power-button"></div>
        </div>
        <div class="retro-base">
          <div class="vent"></div>
          <div class="vent"></div>
        </div>
      </div>
    `
  },
  "path_planning": {
    title: "a_star.py",
    path: "~/portfolio/projects/a_star.py",
    content: `
      <div class="page-header">
        <h1>Navigation & Path Planning Algorithms</h1>
        <div class="path">~/portfolio/projects/a_star.py</div>
      </div>
      <div class="project-details">
        <div class="tags">
          <span class="tag">Python</span><span class="tag">Algorithms</span><span class="tag">Visualization</span>
        </div>
        <p>Path planning is the core of robotics, so I created this repository to visualize and test different algorithms. I implemented everything from classic A* and Dijkstra to sampling-based methods like RRT. It's been a useful sandbox for me to see how different heuristics affect a robot's path through cluttered spaces.</p>
        <p>The system includes a variety of maps, from simple 2D grids to complex environments with non-convex obstacles. I also built a comparison module that tracks metrics like path length, processing time, and memory usage for each algorithm. This has been invaluable for understanding the trade-offs between different planning strategies in real-world scenarios.</p>
        <h3>Key Features:</h3>
        <ul>
          <li><strong>Multiple Algorithms:</strong> Implementation of A*, Dijkstra, BFS, DFS, and RRT.</li>
          <li><strong>Interactive Visualization:</strong> Real-time display of the search process and final generated path.</li>
          <li><strong>Metric Comparison:</strong> In-depth analysis of algorithm performance across different map types.</li>
          <li><strong>Custom Map Support:</strong> Easily load and test algorithms on custom-designed obstacle maps.</li>
        </ul>
        <p><strong>Repo:</strong> <a href="https://github.com/nathanshankar/navigation-algorithms" target="_blank">navigation-algorithms</a></p>
      </div>
      <div class="retro-computer">
        <div class="retro-monitor">
          <div class="retro-screen-frame">
            <div class="retro-screen">
              <div class="terminal-loader">
                <p class="typing-text">> ./path_planner --alg="A_STAR"</p>
                <p style="margin-top: 10px;">MAP: LOADED</p>
                <p>START: [0,0] GOAL: [100,100]</p>
                <p>HEURISTIC: MANHATTAN</p>
                <p style="margin-top: auto;">SEARCHING...</p>
              </div>
              <div class="file-explorer">
                <p style="border-bottom: 1px solid #33ff33; padding-bottom: 5px; margin-bottom: 10px;">Directory: /home/nathan/a_star/</p>
                <div class="file-item" onclick="playRetroMedia(this, 'files/untitled.mp4', 'video')">
                  <span>[VID]</span> a_star_visualizer.mp4
                </div>
                <div class="file-item" onclick="playRetroCode(this, aStarCode)">
                  <span>[PY]</span> a_star.py
                </div>
                <div class="file-item" onclick="alert('Implementation of A*, Dijkstra, and RRT algorithms for robot navigation.')">
                  <span>[TXT]</span> algorithms.txt
                </div>
              </div>
            </div>
          </div>
          <div class="power-button"></div>
        </div>
        <div class="retro-base">
          <div class="vent"></div>
          <div class="vent"></div>
        </div>
      </div>
    `
  },
  "self_driven_car": {
    title: "autonom_car.py",
    path: "~/portfolio/projects/autonom_car.py",
    content: `
      <div class="page-header">
        <h1>Autonomous Self-Driven Car</h1>
        <div class="path">~/portfolio/projects/autonom_car.py</div>
      </div>
      <div class="project-details">
        <div class="tags">
          <span class="tag">Python</span><span class="tag">Computer Vision</span><span class="tag">YOLO</span>
        </div>
        <p>This was a fun project where I programmed a scaled-down car to drive itself. I used vision-based lane centering to keep it on track and integrated sign recognition so it knows when to stop or slow down. It's a great example of how you can implement complex perception and control logic on a budget-friendly platform.</p>
        <p>The car uses a Raspberry Pi for processing camera data and controlling the steering and throttle. I trained a custom YOLOv5 model to detect road signs and pedestrians, ensuring safe operation in a miniature urban environment. The lane centering algorithm uses a combination of Canny edge detection and Hough transforms to identify lane lines and calculate the necessary steering angle in real-time.</p>
        <h3>Key Features:</h3>
        <ul>
          <li><strong>Autonomous Navigation:</strong> Self-driving capabilities including lane keeping and obstacle avoidance.</li>
          <li><strong>Advanced Perception:</strong> Real-time sign and object detection using an optimized YOLO model.</li>
          <li><strong>Precise Control:</strong> PID-based steering and throttle management for smooth operation.</li>
          <li><strong>Hardware Integration:</strong> Seamless communication between high-level vision logic and low-level motor controllers.</li>
        </ul>
        <p><strong>Repo:</strong> <a href="https://github.com/nathanshankar/selfdrivencars-lanecentre" target="_blank">selfdrivencars-lanecentre</a></p>
      </div>
      <div class="retro-computer">
        <div class="retro-monitor">
          <div class="retro-screen-frame">
            <div class="retro-screen">
              <div class="terminal-loader">
                <p class="typing-text">> python3 drive.py --autonomous</p>
                <p style="margin-top: 10px;">LANE_DETECTOR: ACTIVE</p>
                <p>YOLO_v5: LOADING...</p>
                <p>CONTROL: PID_v2</p>
                <p style="margin-top: auto;">IGNITION_START</p>
              </div>
              <div class="file-explorer">
                <p style="border-bottom: 1px solid #33ff33; padding-bottom: 5px; margin-bottom: 10px;">Directory: /home/nathan/self_driven_car/</p>
                <div class="file-item" onclick="playRetroMedia(this, 'files/workingvideo2_changed.mp4', 'video')">
                  <span>[VID]</span> autonomous_drive.mp4
                </div>
                <div class="file-item" onclick="playRetroMedia(this, 'https://sketchfab.com/models/61d212bbebba440bb552b079a4d0b798/embed?autospin=1&autostart=1', 'sketchfab')">
                  <span>[3D]</span> car_body.obj
                </div>
                <div class="file-item" onclick="playRetroMedia(this, 'images/interface1.jpg', 'image')">
                  <span>[IMG]</span> processing_demo.png
                </div>
                <div class="file-item" onclick="alert('Vision-based autonomous driving for scaled vehicles using YOLO and lane centering.')">
                  <span>[TXT]</span> system_architecture.txt
                </div>
              </div>
            </div>
          </div>
          <div class="power-button"></div>
        </div>
        <div class="retro-base">
          <div class="vent"></div>
          <div class="vent"></div>
        </div>
      </div>
    `
  },
  "health_monitoring": {
    title: "health_monitor.cpp",
    path: "~/portfolio/projects/health_monitor.cpp",
    content: `
      <div class="page-header">
        <h1>Health Monitoring System</h1>
        <div class="path">~/portfolio/projects/health_monitor.cpp</div>
      </div>
      <div class="project-details">
        <div class="tags">
          <span class="tag">IoT</span><span class="tag">Sensors</span><span class="tag">Cloud</span>
        </div>
        <p>I built this system to monitor patient vitals in real-time and push that data to the cloud. It tracks things like heart rate, SpO2, and temperature, then displays it on a remote dashboard for doctors to see. I also added an emergency alert feature that notifies family members if any of the vitals cross a dangerous threshold.</p>
        <p>The hardware is built around an ESP32 for its low power consumption and built-in WiFi. I spent a lot of time on the signal processing for the pulse oximeter sensor to ensure accurate readings even when the user is moving slightly. The cloud backend is designed to handle multiple devices simultaneously, providing a scalable solution for hospital-wide monitoring.</p>
        <h3>Key Features:</h3>
        <ul>
          <li><strong>Real-Time Monitoring:</strong> Continuous tracking of critical vitals like heart rate and oxygen saturation.</li>
          <li><strong>Cloud Connectivity:</strong> Secure data streaming to a centralized dashboard for remote access.</li>
          <li><strong>Automated Alerts:</strong> Instant notifications for doctors and family in case of abnormal readings.</li>
          <li><strong>Historical Analysis:</strong> Integrated data logging for tracking long-term health trends.</li>
        </ul>
      </div>
      <div class="retro-computer">
        <div class="retro-monitor">
          <div class="retro-screen-frame">
            <div class="retro-screen">
              <div class="terminal-loader">
                <p class="typing-text">> ./health_monitor --stream</p>
                <p style="margin-top: 10px;">SENSORS: CONNECTED</p>
                <p>WiFi: ESTABLISHED</p>
                <p>CLOUD_SYNC: ON</p>
                <p style="margin-top: auto;">MONITORING...</p>
              </div>
              <div class="file-explorer">
                <p style="border-bottom: 1px solid #33ff33; padding-bottom: 5px; margin-bottom: 10px;">Directory: /home/nathan/health_monitor/</p>
                <div class="file-item" onclick="playRetroMedia(this, 'files/20220425_230836_1_changed_compressed1.mp4', 'video')">
                  <span>[VID]</span> vital_monitoring.mp4
                </div>
                <div class="file-item" onclick="playRetroMedia(this, 'https://sketchfab.com/models/f6204c68dfcb4a068d45759f3b982b00/embed?autospin=1&autostart=1', 'sketchfab')">
                  <span>[3D]</span> pcb_layout.obj
                </div>
                <div class="file-item" onclick="alert('IoT health monitoring system with cloud synchronization and real-time alerts.')">
                  <span>[TXT]</span> sensor_manifest.txt
                </div>
              </div>
            </div>
          </div>
          <div class="power-button"></div>
        </div>
        <div class="retro-base">
          <div class="vent"></div>
          <div class="vent"></div>
        </div>
      </div>
    `
  },
  "bionic_claw": {
    title: "bionic_claw.c",
    path: "~/portfolio/projects/bionic_claw.c",
    content: `
      <div class="page-header">
        <h1>Bionic Claw (Myoelectric Prosthetic)</h1>
        <div class="path">~/portfolio/projects/bionic_claw.c</div>
      </div>
      <div class="project-details">
        <div class="tags">
          <span class="tag">EMG</span><span class="tag">Embedded</span><span class="tag">Prosthetics</span>
        </div>
        <p>This is a low-cost prosthetic claw I designed that's controlled by muscle signals (EMG). I used Myoware sensors to pick up muscle stress and map it to the claw's grip strength. It also has a manual precision mode using a potentiometer and some preset gestures for things like grabbing or releasing objects quickly.</p>
        <p>The core of this project was the signal processing for the EMG data. I implemented a digital low-pass filter to smooth out the raw signals and prevent the claw from twitching during operation. The system is designed to be highly responsive, with a custom mapping algorithm that allows the user to perform delicate tasks like picking up an egg as well as more robust grasping actions.</p>
        <h3>Key Features:</h3>
        <ul>
          <li><strong>Myoelectric Control:</strong> Proportional grip control based on real-time muscle signal intensity.</li>
          <li><strong>Dual Mode:</strong> Toggle between muscle-controlled autonomous grasping and manual precision tuning.</li>
          <li><strong>Smooth Response:</strong> Advanced digital filtering for stable and natural-feeling claw movements.</li>
          <li><strong>Integrated Presets:</strong> Quickly trigger common gestures like a full grasp or a delicate pinch.</li>
        </ul>
        <p><strong>DOI:</strong> <a href="https://doi.org/10.21203/rs.3.rs-2138754/v1" target="_blank">10.21203/rs.3.rs-2138754/v1</a></p>
      </div>
      <div class="retro-computer">
        <div class="retro-monitor">
          <div class="retro-screen-frame">
            <div class="retro-screen">
              <div class="terminal-loader">
                <p class="typing-text">> ./claw_driver --mode="EMG"</p>
                <p style="margin-top: 10px;">SIGNAL: DETECTED</p>
                <p>ADC_v12: CALIBRATED</p>
                <p>SERVO: CENTERED</p>
                <p style="margin-top: auto;">GRIP_READY</p>
              </div>
              <div class="file-explorer">
                <p style="border-bottom: 1px solid #33ff33; padding-bottom: 5px; margin-bottom: 10px;">Directory: /home/nathan/bionic_claw/</p>
                <div class="file-item" onclick="playRetroMedia(this, 'files/bionicclaw_changed.mp4', 'video')">
                  <span>[VID]</span> emg_control_test.mp4
                </div>
                <div class="file-item" onclick="playRetroMedia(this, 'https://sketchfab.com/models/0ea089736bf94397b7189662b71f35c1/embed?autospin=1&autostart=1', 'sketchfab')">
                  <span>[3D]</span> gripper_v2.obj
                </div>
                <div class="file-item" onclick="alert('Myoelectric (EMG) controlled functional prosthetic claw with multi-mode operation.')">
                  <span>[TXT]</span> specifications.txt
                </div>
              </div>
            </div>
          </div>
          <div class="power-button"></div>
        </div>
        <div class="retro-base">
          <div class="vent"></div>
          <div class="vent"></div>
        </div>
      </div>
    `
  },
  "charge_estimation": {
    title: "battery_soc.txt",
    path: "~/portfolio/research/battery_soc.txt",
    content: `
      <div class="page-header">
        <h1>SoC Charge Estimation</h1>
        <div class="path">~/portfolio/research/battery_soc.txt</div>
      </div>
      <div class="research-details">
        <h3>Performance Comparison of Conventional and Intelligent method of Charge Estimation</h3>
        <p>Published in: <strong>i-PACT 2021 (Best Paper Award)</strong></p>
        <p>Compares Linear Kalman Filter (LKF) and Feed Forward Neural Networks for battery State of Charge (SoC) estimation.</p>
        <p><strong>DOI:</strong> <a href="https://doi.org/10.1109/i-PACT52855.2021.9697046" target="_blank">10.1109/i-PACT52855.2021.9697046</a></p>
      </div>
    `
  },
  "iomt_uav": {
    title: "iomt_uav_ai.pdf",
    path: "~/portfolio/research/iomt_uav_ai.pdf",
    content: `
      <div class="page-header">
        <h1>Smart IoMT Framework</h1>
        <div class="path">~/portfolio/research/iomt_uav_ai.pdf</div>
      </div>
      <div class="research-details">
        <h3>Smart IoMT Framework for Supporting UAV Systems with AI</h3>
        <p>Published in: <strong>Electronics, 2023</strong></p>
        <p>Remote health monitoring system integrated with a UAV for remote patient surveillance and automated data analysis.</p>
        <p><strong>DOI:</strong> <a href="http://dx.doi.org/10.3390/electronics12010086" target="_blank">10.3390/electronics12010086</a></p>
      </div>
    `
  },
  "solar_xai": {
    title: "solar_xai.txt",
    path: "~/portfolio/research/solar_xai.txt",
    content: `
      <div class="page-header">
        <h1>Solar XAI Insights</h1>
        <div class="path">~/portfolio/research/solar_xai.txt</div>
      </div>
      <div class="research-details">
        <h3>Unveiling XAI insights for enhanced power system management</h3>
        <p>Published in: <strong>ELSEVIER</strong></p>
        <p>An advanced Explainable Artificial Intelligence (XAI) framework to explicate ML models decision-making for solar energy.</p>
        <p><strong>DOI:</strong> <a href="https://doi.org/10.1016/j.asej.2024.102740" target="_blank">10.1016/j.asej.2024.102740</a></p>
      </div>
    `
  },
  "lane_detection": {
    title: "lane_obj_det.txt",
    path: "~/portfolio/research/lane_obj_det.txt",
    content: `
      <div class="page-header">
        <h1>Lane & Object Detection</h1>
        <div class="path">~/portfolio/research/lane_obj_det.txt</div>
      </div>
      <div class="research-details">
        <h3>Novel lane and object detection technique using visual camera</h3>
        <p>Published in: <strong>AIP Publishing</strong></p>
        <p>Real-time detection system using visual input, segmenting and simultaneously executing detection parameters.</p>
        <p><strong>DOI:</strong> <a href="https://doi.org/10.1063/5.0189805" target="_blank">10.1063/5.0189805</a></p>
      </div>
    `
  },
  "phd_work": {
    title: "PHD_WORK",
    path: "~/portfolio/phd_work/",
    content: `
      <div class="page-header">
        <h1>PhD Research Overview</h1>
        <div class="path">~/portfolio/phd_work/</div>
      </div>
      <p class="section-intro">Ongoing PhD research at the <strong>University of Manchester</strong> focusing on autonomous robotics in challenging environments.</p>
      <div class="research-grid">
        <div class="research-card" onclick="loadPage(event, 'dark_nav')">
          <div class="card-badge">Ongoing</div>
          <h3 class="card-title">Autonomous Navigation in the Dark</h3>
          <p class="card-venue">University of Manchester</p>
          <p class="card-desc">Developing vision-based systems for robots to navigate in complete darkness using CLEAR-IR and AI.</p>
        </div>
      </div>
      <div style="margin-top: 30px;">
        <h3>Core Research Pillars</h3>
        <div class="project-grid">
          <div class="project-card" onclick="loadPage(event, 'dark_nav')">
            <div class="card-header"><span class="card-icon">👁️</span><h3 class="card-title">CLEAR-IR</h3></div>
            <p class="card-desc">AI-driven enhancement of noisy infrared streams for reliable spatial perception.</p>
            <div class="card-tags"><span class="mini-tag">AI</span><span class="mini-tag">U-Net</span><span class="mini-tag">Infrared</span></div>
          </div>
          <div class="project-card" onclick="loadPage(event, 'navigation_report')">
            <div class="card-header"><span class="card-icon">🛰️</span><h3 class="card-title">Vision-Centric Reliability</h3></div>
            <p class="card-desc">Robust navigation without heavy floodlights or expensive sensors.</p>
            <div class="card-tags"><span class="mini-tag">Localization</span><span class="mini-tag">SLAM</span></div>
          </div>
        </div>
      </div>
    `
  },
  "dark_nav": {
    title: "dark_nav_system.py",
    path: "~/dark-nav/dark_nav_system.py",
    content: `
      <div class="page-header">
        <h1>Autonomous Navigation in Dark Environments</h1>
        <div class="path">~/dark-nav/dark_nav_system.py</div>
      </div>
      <div class="project-details">
        <div class="tags">
          <span class="tag">AI</span><span class="tag">CLEAR-IR</span><span class="tag">Infrared</span><span class="tag">Robotics</span>
        </div>
        <p>This research addresses a critical limitation in robotics: the failure of standard camera systems and localization when lighting is insufficient. I developed <strong>CLEAR-IR</strong> (Clarity-Enhanced Active Reconstruction of Infrared Imagery), a deep learning approach that "cleans" infrared images in real-time, enabling robots to perceive and navigate unknown environments where conventional vision fails.</p>
        
        <h3>Research Focus:</h3>
        <ul>
          <li><strong>CLEAR-IR Framework:</strong> A U-Net based architecture that removes emitter patterns and reconstructs high-quality images mimicking standard RGB cameras.</li>
          <li><strong>Vision-Centric Reliability:</strong> Achieving robust navigation without relying on heavy floodlights or a multitude of expensive sensors, making it more efficient for battery-constrained platforms.</li>
          <li><strong>Demonstrated Capabilities:</strong> Successful demos for autonomous exploration in the dark and real-time object detection using infrared cameras.</li>
        </ul>

        <h3>Real-World Applications:</h3>
        <div class="project-grid" style="grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));">
          <div class="project-card" style="min-height: auto; padding: 15px;">
            <h4 style="margin: 0; color: var(--accent-orange);">Search & Rescue</h4>
            <p style="font-size: 12px; margin: 5px 0 0 0;">Locating survivors in collapsed tunnels or low-light buildings.</p>
          </div>
          <div class="project-card" style="min-height: auto; padding: 15px;">
            <h4 style="margin: 0; color: var(--accent-blue);">Space Exploration</h4>
            <p style="font-size: 12px; margin: 5px 0 0 0;">Navigating permanently shadowed craters on the Moon or Mars.</p>
          </div>
          <div class="project-card" style="min-height: auto; padding: 15px;">
            <h4 style="margin: 0; color: var(--accent-green);">Industrial Inspection</h4>
            <p style="font-size: 12px; margin: 5px 0 0 0;">Monitoring high-risk, hazardous zones like nuclear plants or deep mines.</p>
          </div>
        </div>

        <p style="margin-top: 20px;"><strong>Website:</strong> <a href="https://ladoszlabs.github.io/dark-nav/" target="_blank">ladoszlabs.github.io/dark-nav/</a></p>
      </div>
      
      <div class="retro-computer">
        <div class="retro-monitor">
          <div class="retro-screen-frame">
            <div class="retro-screen">
              <div class="terminal-loader">
                <p class="typing-text">> python3 navigate_dark.py --ir-mode --clear-ir</p>
                <p style="margin-top: 10px;">INITIALIZING IR_SENSOR_v4...</p>
                <p>AI_ENHANCEMENT: CLEAR-IR ACTIVE</p>
                <p>MAPPING: UNKNOWN_ENVIRONMENT</p>
                <p>LIGHT_LEVEL: 0.02 LUX (CRITICAL)</p>
                <p style="margin-top: auto;">NAVIGATION_ACTIVE</p>
              </div>
              <div class="file-explorer">
                <p style="border-bottom: 1px solid #33ff33; padding-bottom: 5px; margin-bottom: 10px;">Directory: /home/nathan/dark-nav/</p>
                <div class="file-item" onclick="window.open('https://ladoszlabs.github.io/dark-nav/', '_blank')">
                  <span>[WWW]</span> Open Research Website
                </div>
                <div class="file-item" onclick="playRetroMedia(this, 'https://arxiv.org/pdf/2510.04883v1', 'pdf')">
                  <span>[PDF]</span> clear_ir_paper.pdf
                </div>
                <div class="file-item" onclick="playRetroMedia(this, 'https://ladoszlabs.github.io/dark-nav/nav_in_dark.mp4', 'video')">
                  <span>[VID]</span> autonomous_exploration.mp4
                </div>
                <div class="file-item" onclick="playRetroMedia(this, 'http://ladoszlabs.github.io/dark-nav/ir_object_detect_1.mp4', 'video')">
                  <span>[VID]</span> object_detection_dark.mp4
                </div>
                <div class="file-item" onclick="playRetroMedia(this, 'https://www.youtube.com/embed/RJ8qQAx-SoI?autoplay=1', 'youtube')">
                  <span>[VID]</span> research_goals_year1.mp4
                </div>
                <div class="file-item" onclick="playRetroMedia(this, 'https://www.youtube.com/embed/qeitZW0Wtiw?autoplay=1', 'youtube')">
                  <span>[VID]</span> research_goals_year2.mp4
                </div>
                <div class="file-item" onclick="alert('Autonomous exploration in complete darkness using IR and CLEAR-IR enhanced vision.')">
                  <span>[TXT]</span> README_DARK_NAV.txt
                </div>
              </div>
            </div>
          </div>
          <div class="power-button"></div>
        </div>
        <div class="retro-base">
          <div class="vent"></div>
          <div class="vent"></div>
        </div>
      </div>
    `
  },
  "contact": {
    title: "CONTACT.json",
    path: "~/portfolio/CONTACT.json",
    content: `
      <div class="page-header">
        <h1>Contact Information</h1>
        <div class="path">~/portfolio/CONTACT.json</div>
      </div>
      <div class="contact-card">
        <pre style="color:var(--accent-blue)">
{
  "name": "Nathan Shankar",
  "location": "University of Manchester",
  "socials": {
    "github": "<a href="https://github.com/nathanshankar" target="_blank">github.com/nathanshankar</a>",
    "linkedin": "<a href="https://www.linkedin.com/in/nathan-shankar-47912395/" target="_blank">linkedin.com/in/nathan-shankar-47912395/</a>",
    "email": "nathanshankar465@gmail.com"
  }
}
        </pre>
      </div>
    `
  },
  "archive": {
    title: "ARCHIVE",
    path: "~/portfolio/projects/archive/",
    content: `
      <div class="page-header">
        <h1>Archived Projects</h1>
        <div class="path">~/portfolio/projects/archive/</div>
      </div>
      <p class="section-intro">Legacy projects and earlier technical implementations.</p>
      <div class="project-grid">
        <div class="project-card" onclick="loadPage(event, 'leo_rover')">
          <div class="card-header"><span class="card-icon"></span><h3 class="card-title">Leo Rover Exploration</h3></div>
          <p class="card-desc">ROS2 frontier-based autonomous mapping and navigation system.</p>
          <div class="card-tags"><span class="mini-tag">ROS2</span><span class="mini-tag">SLAM</span></div>
        </div>
        <div class="project-card" onclick="loadPage(event, 'drone_control')">
          <div class="card-header"><span class="card-icon"></span><h3 class="card-title">Drone Stabilization</h3></div>
          <p class="card-desc">Disturbance observer-based flight control for wind compensation.</p>
          <div class="card-tags"><span class="mini-tag">PID</span><span class="mini-tag">Control</span></div>
        </div>
        <div class="project-card" onclick="loadPage(event, 'path_planning')">
          <div class="card-header"><span class="card-icon"></span><h3 class="card-title">Path Planning</h3></div>
          <p class="card-desc">Implementation and visualization of A*, RRT, and Dijkstra.</p>
          <div class="card-tags"><span class="mini-tag">Python</span><span class="mini-tag">Algorithms</span></div>
        </div>
        <div class="project-card" onclick="loadPage(event, 'faceguard')">
          <div class="card-header"><span class="card-icon"></span><h3 class="card-title">FaceGuard AI</h3></div>
          <p class="card-desc">Real-time facial recognition pipeline with automated training.</p>
          <div class="card-tags"><span class="mini-tag">OpenCV</span><span class="mini-tag">AI</span></div>
        </div>
        <div class="project-card" onclick="loadPage(event, 'self_driven_car')">
          <div class="card-header"><span class="card-icon"></span><h3 class="card-title">Autonomous Car</h3></div>
          <p class="card-desc">Lane centering and sign recognition for scaled vehicles.</p>
          <div class="card-tags"><span class="mini-tag">Vision</span><span class="mini-tag">Control</span></div>
        </div>
        <div class="project-card" onclick="loadPage(event, 'biped_robot')">
          <div class="card-header"><span class="card-icon"></span><h3 class="card-title">Bipedal Robot</h3></div>
          <p class="card-desc">13-DOF humanoid robot with inverse kinematics and vision.</p>
          <div class="card-tags"><span class="mini-tag">Humanoid</span><span class="mini-tag">IK</span></div>
        </div>
        <div class="project-card" onclick="loadPage(event, 'bionic_claw')">
          <div class="card-header"><span class="card-icon"></span><h3 class="card-title">Bionic Prosthetic</h3></div>
          <p class="card-desc">Myoelectric (EMG) controlled functional prosthetic claw.</p>
          <div class="card-tags"><span class="mini-tag">Embedded</span><span class="mini-tag">Bio</span></div>
        </div>
      </div>
    `
  },
  "terminal_rviz": {
    title: "terminal_rviz.cpp",
    path: "~/portfolio/projects/terminal_rviz.cpp",
    content: `
      <div class="page-header">
        <h1>Terminal RViz: 3D Visualizer for ROS 2</h1>
        <div class="path">~/portfolio/projects/terminal_rviz.cpp</div>
      </div>
      <div class="project-details">
        <div class="tags">
          <span class="tag">ROS 2</span><span class="tag">C++</span><span class="tag">3D Rendering</span><span class="tag">FTXUI</span>
        </div>
        <p>I built Terminal RViz because I got tired of not being able to visualize my robot's data when I was SSH'd into it from a weak connection. It's a full 3D visualizer that runs right in your terminal using Braille characters to render points and lines. It's surprisingly fast and has almost everything the real RViz has—URDFs, TFs, point clouds, and even a Nav2 dashboard.</p>
        <h3>Key Features:</h3>
        <ul>
          <li><strong>High-Density 3D Rendering:</strong> Uses Braille characters with dot-level Z-buffering for surprisingly detailed visuals.</li>
          <li><strong>Plugin Support:</strong> Handles RobotModels, TFs, PointClouds, LaserScans, and even Map data.</li>
          <li><strong>Headless Friendly:</strong> Perfect for debugging on remote robots where you can't run a full GUI.</li>
          <li><strong>Interactive:</strong> Supports mouse clicks, teleoperation, and real-time dashboard monitoring.</li>
        </ul>
        <p><strong>Repo:</strong> <a href="https://github.com/nathanshankar/terminal_rviz" target="_blank">terminal_rviz</a></p>
      </div>
      <div class="retro-computer">
        <div class="retro-monitor">
          <div class="retro-screen-frame">
            <div class="retro-screen">
              <div class="terminal-loader">
                <p class="typing-text">> ./load_visualizer --source=remote</p>
                <p style="margin-top: 10px;">CONNECTING TO ROBOT...</p>
                <p>ESTABLISHING TELEMETRY...</p>
                <p style="color: #ffff33;">[WARNING] LOW BANDWIDTH DETECTED</p>
                <p>INITIALIZING BRAILLE RENDERER...</p>
                <p style="margin-top: auto;">READY.</p>
              </div>
              <div class="file-explorer">
                <p style="border-bottom: 1px solid #33ff33; padding-bottom: 5px; margin-bottom: 10px;">Directory: /home/nathan/tviz/</p>
                <div class="file-item" onclick="playRetroMedia(this, 'https://github.com/user-attachments/assets/7de335d5-dcbd-4406-924a-e97399f521e4', 'video')">
                  <span>[VID]</span> demo_visualizer.mp4
                </div>
                <div class="file-item" onclick="alert('Terminal-based 3D visualizer using Braille software rendering.')">
                  <span>[TXT]</span> README.txt
                </div>
              </div>
            </div>
          </div>
          <div class="power-button"></div>
        </div>
        <div class="retro-base">
          <div class="vent"></div>
          <div class="vent"></div>
        </div>
      </div>
    `
  },
  "fast_seg": {
    title: "fast_seg.cpp",
    path: "~/portfolio/projects/fast_seg.cpp",
    content: `
      <div class="page-header">
        <h1>FAST-SEG: Efficient Point Cloud Segmentation</h1>
        <div class="path">~/portfolio/projects/fast_seg.cpp</div>
      </div>
      <div class="project-details">
        <div class="tags">
          <span class="tag">ROS 2</span><span class="tag">C++</span><span class="tag">PCL</span><span class="tag">DBSCAN</span>
        </div>
        <p>This is a ROS 2 package I put together for quick point cloud segmentation. I used DBSCAN for the clustering and hooked it up to a Kalman Filter so the object IDs don't jump around between frames. It's really useful for things like obstacle detection where you need to know exactly where objects are moving in real-time.</p>
        <h3>Key Features:</h3>
        <ul>
          <li><strong>Stable Tracking:</strong> Uses Kalman Filters to keep track of objects even when they're moving fast.</li>
          <li><strong>Optimized Pipeline:</strong> Voxel grid downsampling ensures it runs smoothly on embedded hardware.</li>
          <li><strong>Adaptive Filtering:</strong> Cleans up ground and ceiling data automatically so you only see the objects that matter.</li>
        </ul>
        <p><strong>Repo:</strong> <a href="https://github.com/nathanshankar/FAST-SEG" target="_blank">FAST-SEG</a></p>
      </div>
      <div class="retro-computer">
        <div class="retro-monitor">
          <div class="retro-screen-frame">
            <div class="retro-screen">
              <div class="terminal-loader">
                <p class="typing-text">> ros2 run fast_seg cluster_node</p>
                <p style="margin-top: 10px;">SUBSCRIPTION ACTIVE: /lidar_points</p>
                <p>VOXEL FILTER: ON</p>
                <p>CLUSTERING: DBSCAN</p>
                <p>TRACKING: KALMAN_FILTER_v2.1</p>
                <p style="margin-top: auto;">PROCESSING STREAM...</p>
              </div>
              <div class="file-explorer">
                <p style="border-bottom: 1px solid #33ff33; padding-bottom: 5px; margin-bottom: 10px;">Directory: /home/nathan/fast_seg/</p>
                <div class="file-item" onclick="playRetroMedia(this, 'https://github.com/user-attachments/assets/c650a529-6b12-4f3f-8a95-87a96c517003/', 'video')">
                  <span>[VID]</span> clustering_demo.mp4
                </div>
                <div class="file-item" onclick="alert('Point cloud segmentation using DBSCAN and Kalman Filter tracking.')">
                  <span>[TXT]</span> tech_specs.txt
                </div>
              </div>
            </div>
          </div>
          <div class="power-button"></div>
        </div>
        <div class="retro-base">
          <div class="vent"></div>
          <div class="vent"></div>
        </div>
      </div>
    `
  },
  "tello_gz": {
    title: "tello_gz.py",
    path: "~/portfolio/projects/tello_gz.py",
    content: `
      <div class="page-header">
        <h1>Tello Drone ROS 2 & Gazebo Integration</h1>
        <div class="path">~/portfolio/projects/tello_gz.py</div>
      </div>
      <div class="project-details">
        <div class="tags">
          <span class="tag">ROS 2</span><span class="tag">Gazebo Sim</span><span class="tag">Octomap</span>
        </div>
        <p>I wanted a solid way to test autonomous flight without crashing my Tello, so I built this Gazebo simulation environment. It includes a high-fidelity model of the drone and a complex cave world to test mapping. I also integrated Octomap for 3D volumetric mapping and wrote some custom planners to help it navigate through tight spaces.</p>
        <h3>Key Features:</h3>
        <ul>
          <li><strong>High-Fidelity Model:</strong> Accurate drone URDF with simulated IMU and camera sensors.</li>
          <li><strong>3D Mapping:</strong> Generates real-time Octomaps for obstacle avoidance in 3D space.</li>
          <li><strong>Autonomous Ready:</strong> Includes custom planner nodes designed specifically for drone navigation in tight caves.</li>
        </ul>
        <p><strong>Repo:</strong> <a href="https://github.com/nathanshankar/tello_ros2_gz" target="_blank">tello_ros2_gz</a></p>
      </div>
      <div class="retro-computer">
        <div class="retro-monitor">
          <div class="retro-screen-frame">
            <div class="retro-screen">
              <div class="terminal-loader">
                <p class="typing-text">> ignition gazebo cave_world.sdf</p>
                <p style="margin-top: 10px;">LOADING WORLD: CAVE_SYSTEM_v4</p>
                <p>SPAWNING: TELLO_DRONE</p>
                <p>ATTACHING: DEPTH_CAMERA</p>
                <p>MAPPING: OCTOMAP_ACTIVE</p>
                <p style="margin-top: auto;">SIMULATION STARTED.</p>
              </div>
              <div class="file-explorer">
                <p style="border-bottom: 1px solid #33ff33; padding-bottom: 5px; margin-bottom: 10px;">Directory: /home/nathan/tello_sim/</p>
                <div class="file-item" onclick="playRetroMedia(this, 'https://github.com/user-attachments/assets/080d95ee-44bd-4936-8823-40846bc41f1f', 'image')">
                  <span>[IMG]</span> cave_environment.png
                </div>
                <div class="file-item" onclick="alert('Gazebo simulation infrastructure for DJI Tello drones.')">
                  <span>[TXT]</span> project_info.txt
                </div>
              </div>
            </div>
          </div>
          <div class="power-button"></div>
        </div>
        <div class="retro-base">
          <div class="vent"></div>
          <div class="vent"></div>
        </div>
      </div>
    `
  },
  "realsense_sim": {
    title: "realsense_sim.cpp",
    path: "~/portfolio/projects/realsense_sim.cpp",
    content: `
      <div class="page-header">
        <h1>Intel RealSense IR Emitter Simulator</h1>
        <div class="path">~/portfolio/projects/realsense_sim.cpp</div>
      </div>
      <div class="project-details">
        <div class="tags">
          <span class="tag">ROS 2</span><span class="tag">Gazebo Plugin</span><span class="tag">RealSense</span>
        </div>
        <p>Standard Gazebo simulations usually struggle with depth cameras because surfaces are too 'perfect' for stereo matching. I wrote this plugin to simulate the actual IR pattern that RealSense cameras project. It adds that needed texture to featureless walls and floors, making the simulated depth data look and behave a lot more like the real thing, especially in low-light scenarios.</p>
        <h3>Key Features:</h3>
        <ul>
          <li><strong>Realistic IR Patterns:</strong> Simulates the dynamic IR projector to improve stereo matching accuracy.</li>
          <li><strong>Physics-Based:</strong> Uses Lambert's Cosine Law and radial vignetting for realistic light behavior.</li>
          <li><strong>Broad Support:</strong> Works with both ROS 2 Humble and Jazzy distributions.</li>
        </ul>
        <p><strong>Repo:</strong> <a href="https://github.com/nathanshankar/gz_realsense" target="_blank">gz_realsense</a></p>
      </div>
      <div class="retro-computer">
        <div class="retro-monitor">
          <div class="retro-screen-frame">
            <div class="retro-screen">
              <div class="terminal-loader">
                <p class="typing-text">> load_plugin librealsense_ir_emitter.so</p>
                <p style="margin-top: 10px;">MAPPING IR TEXTURE...</p>
                <p>JITTER: ENABLED</p>
                <p>VIGNETTING: ACTIVE</p>
                <p>NORMAL CALCULATION: PHYSICS_ENABLED</p>
                <p style="margin-top: auto;">EMITTING PATTERN...</p>
              </div>
              <div class="file-explorer">
                <p style="border-bottom: 1px solid #33ff33; padding-bottom: 5px; margin-bottom: 10px;">Directory: /home/nathan/ir_sim/</p>
                <div class="file-item" onclick="playRetroMedia(this, 'https://github.com/user-attachments/assets/a8f81fb9-3d02-4354-aab1-d3d90f5e4b35', 'video')">
                  <span>[VID]</span> ir_projection.mp4
                </div>
                <div class="file-item" onclick="alert('Gazebo plugin for realistic IR pattern simulation.')">
                  <span>[TXT]</span> plugin_specs.txt
                </div>
              </div>
            </div>
          </div>
          <div class="power-button"></div>
        </div>
        <div class="retro-base">
          <div class="vent"></div>
          <div class="vent"></div>
        </div>
      </div>
    `
  },
  "projects": {
    title: "PROJECTS",
    path: "~/portfolio/projects/",
    content: `
      <div class="page-header">
        <h1>Projects Overview</h1>
        <div class="path">~/portfolio/projects/</div>
      </div>
      <p class="section-intro">Featured technical implementations from my current research and development work.</p>
      <div class="project-grid" id="featured-projects">
        <div class="project-card" onclick="loadPage(event, 'terminal_rviz')">
          <div class="card-header"><span class="card-icon"></span><h3 class="card-title">Terminal RViz</h3></div>
          <p class="card-desc">Headless 3D visualizer for ROS 2 with Braille-based rendering.</p>
          <div class="card-tags"><span class="mini-tag">ROS 2</span><span class="mini-tag">C++</span></div>
        </div>
        <div class="project-card" onclick="loadPage(event, 'fast_seg')">
          <div class="card-header"><span class="card-icon"></span><h3 class="card-title">FAST-SEG</h3></div>
          <p class="card-desc">Efficient point cloud segmentation using DBSCAN.</p>
          <div class="card-tags"><span class="mini-tag">C++</span><span class="mini-tag">PCL</span></div>
        </div>
        <div class="project-card" onclick="loadPage(event, 'tello_gz')">
          <div class="card-header"><span class="card-icon"></span><h3 class="card-title">Tello ROS 2 Simulation</h3></div>
          <p class="card-desc">DJI Tello integration with ROS 2 and Gazebo.</p>
          <div class="card-tags"><span class="mini-tag">ROS 2</span><span class="mini-tag">Gazebo</span></div>
        </div>
        <div class="project-card" onclick="loadPage(event, 'realsense_sim')">
          <div class="card-header"><span class="card-icon"></span><h3 class="card-title">RealSense IR Sim</h3></div>
          <p class="card-desc">Gazebo plugin for realistic IR emitter simulation.</p>
          <div class="card-tags"><span class="mini-tag">Gazebo</span><span class="mini-tag">Plugin</span></div>
        </div>
      </div>
    `
  },
  "research": {
    title: "RESEARCH",
    path: "~/portfolio/research/",
    content: `
      <div class="page-header">
        <h1>Research Work</h1>
        <div class="path">~/portfolio/research/</div>
      </div>
      <p class="section-intro">Academic publications and technical research in intelligent systems.</p>
      <div class="research-grid">
        <div class="research-card" onclick="loadPage(event, 'charge_estimation')">
          <div class="card-badge">Awarded</div>
          <h3 class="card-title">Battery SoC Estimation</h3>
          <p class="card-venue">i-PACT 2021</p>
          <p class="card-desc">Comparison of LKF and FFNN for real-time charge prediction.</p>
        </div>
        <div class="research-card" onclick="loadPage(event, 'iomt_uav')">
          <h3 class="card-title">Smart IoMT UAV Framework</h3>
          <p class="card-venue">Electronics 2023</p>
          <p class="card-desc">AI-powered health monitoring using remote aerial systems.</p>
        </div>
        <div class="research-card" onclick="loadPage(event, 'solar_xai')">
          <h3 class="card-title">Explainable AI (XAI) in Solar</h3>
          <p class="card-venue">ELSEVIER</p>
          <p class="card-desc">Decision-making transparency in power system management.</p>
        </div>
        <div class="research-card" onclick="loadPage(event, 'lane_detection')">
          <h3 class="card-title">Real-time Lane Detection</h3>
          <p class="card-venue">AIP Publishing</p>
          <p class="card-desc">Novel vision-based detection for autonomous vehicles.</p>
        </div>
      </div>
    `
  }
};

function loadPage(e, pageKey) {
  if (e) {
    e.stopPropagation();
    e.currentTarget.classList.add('click-pulse');
    setTimeout(() => {
      if (e.currentTarget) e.currentTarget.classList.remove('click-pulse');
    }, 400);
  }
  
  const page = contentData[pageKey];
  if (!page) return;

  const viewer = document.getElementById('content-viewer');
  
  // Apple "Close" Animation
  viewer.classList.remove('apple-open');
  viewer.classList.add('apple-close');

  // Wait for close animation to finish
  setTimeout(() => {
    viewer.innerHTML = page.content;
    
    // Reset scroll
    viewer.scrollTop = 0;
    
    // Apple "Open" Animation
    viewer.classList.remove('apple-close');
    void viewer.offsetWidth; // Force reflow
    viewer.classList.add('apple-open');

    // Update window title
    document.querySelector('.window-title').textContent = page.title + " - nathan_shankar_v2.sh";

    // Add active state to sidebar
    document.querySelectorAll('.file, .folder').forEach(el => el.classList.remove('active'));
    
    // Find the element in sidebar to highlight
    const sidebarLinks = document.querySelectorAll('.file');
    sidebarLinks.forEach(f => {
      const onclick = f.getAttribute('onclick');
      if (onclick && onclick.includes(`'${pageKey}'`)) {
         f.classList.add('active');
         // Ensure parent folders are expanded
         let parent = f.parentElement;
         while (parent && parent.classList.contains('folder-content')) {
           parent.classList.add('open');
           const prev = parent.previousElementSibling;
           if (prev && prev.classList.contains('folder')) {
             prev.classList.add('open');
             const arrow = prev.querySelector('.arrow');
             if (arrow) arrow.textContent = '▼';
           }
           parent = parent.parentElement;
         }
      }
    });

    // Close sidebar on mobile
    if (window.innerWidth <= 768) {
      const sidebar = document.querySelector('.sidebar');
      if (sidebar) sidebar.classList.remove('open');
    }
  }, 200); // Small delay for the close animation to begin
}

function toggleSidebar() {
  const sidebar = document.querySelector('.sidebar');
  if (sidebar) sidebar.classList.toggle('open');
}

function toggleFolder(e, folderId, pageKey) {
  if (e) {
    e.stopPropagation();
    e.currentTarget.classList.add('click-pulse');
    setTimeout(() => {
      if (e.currentTarget) e.currentTarget.classList.remove('click-pulse');
    }, 400);
  }
  
  const folder = document.getElementById(folderId);
  const arrow = e.currentTarget.querySelector('.arrow');
  
  // Toggle visibility
  if (!folder.classList.contains('open')) {
    folder.classList.add('open');
    e.currentTarget.classList.add('open');
    arrow.textContent = '▼';
  } else {
    folder.classList.remove('open');
    e.currentTarget.classList.remove('open');
    arrow.textContent = '▶';
  }

  // Load the overview page
  loadPage(null, pageKey);
  
  // Highlight folder
  document.querySelectorAll('.file, .folder').forEach(el => el.classList.remove('active'));
  e.currentTarget.classList.add('active');
}

// Initial Boot Sequence
document.addEventListener('DOMContentLoaded', () => {
  const status = document.getElementById('boot-status');
  const steps = [
    "Establishing neural link...",
    "Mounting /home/nathan/portfolio...",
    "Initializing UI components...",
    "Ready."
  ];
  
  let step = 0;
  const interval = setInterval(() => {
    if (step < steps.length) {
      const p = document.createElement('p');
      p.textContent = "> " + steps[step];
      status.appendChild(p);
      step++;
    } else {
      clearInterval(interval);
      setTimeout(() => {
        loadPage(null, 'about');
      }, 500);
    }
  }, 300);
});

function playRetroMedia(btn, src, type) {
  const screen = btn.closest('.retro-screen');
  const explorer = screen.querySelector('.file-explorer');
  
  // Create media element
  let media;
  if (type === 'video') {
    media = document.createElement('video');
    media.src = src;
    media.controls = true;
    media.autoplay = true;
    media.loop = true;
  } else if (type === 'sketchfab' || type === 'youtube' || type === 'pdf') {
    media = document.createElement('iframe');
    
    // YouTube-specific URL adjustments
    let finalSrc = src;
    if (type === 'youtube') {
      const url = new URL(src);
      // Ensure it's the embed domain
      if (url.hostname.includes('youtube.com') && !url.pathname.startsWith('/embed/')) {
        const videoId = url.searchParams.get('v') || url.pathname.split('/').pop();
        finalSrc = `https://www.youtube.com/embed/${videoId}`;
      }
      // Add necessary params for better embedding
      const separator = finalSrc.includes('?') ? '&' : '?';
      let origin = '';
      try {
        if (window.location.protocol.startsWith('http')) {
          origin = `&origin=${encodeURIComponent(window.location.origin)}`;
        }
      } catch (e) {}
      finalSrc += `${separator}rel=0&enablejsapi=1${origin}`;
    }
    
    media.setAttribute('src', finalSrc);
    media.setAttribute('title', type === 'sketchfab' ? "3D Model" : (type === 'youtube' ? "YouTube Video" : "PDF Document"));
    media.setAttribute('frameborder', '0');
    
    if (type !== 'pdf') {
      media.setAttribute('allowfullscreen', '');
      if (type === 'sketchfab') {
        media.setAttribute('allow', 'autoplay; fullscreen; xr-spatial-tracking');
      } else if (type === 'youtube') {
        media.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
      }
    }
    
    media.style.width = "100%";
    media.style.height = "100%";
    media.style.border = "none";
  } else {
    media = document.createElement('img');
    media.src = src;
  }
  
  media.classList.add('active-media');
  // Ensure media is above CRT effects for interaction, but under for look if pointer-events handle it
  // Actually, CRT effects are on top with pointer-events: none.
  // If YouTube player complains about obscuring, we might need to lower CRT z-index.
  
  // Add back button
  const backBtn = document.createElement('div');
  backBtn.className = 'retro-back-btn';
  backBtn.innerHTML = '< RETURN';
  backBtn.onclick = () => {
    media.remove();
    backBtn.remove();
    if (explorer) explorer.style.display = 'block';
  };
  
  if (explorer) explorer.style.display = 'none';
  screen.appendChild(media);
  screen.appendChild(backBtn);
}

// Global scope attachment
window.playRetroMedia = playRetroMedia;

function startCodeTyper(container, code, speed = 30) {
  let currentCharIndex = 0;
  container.innerHTML = '';
  
  function isKeyword(word) {
    const keywords = [
      'False', 'None', 'True', 'and', 'as', 'assert', 'async', 'await', 'break', 'class', 'continue',
      'def', 'del', 'elif', 'else', 'except', 'finally', 'for', 'from', 'global', 'if', 'import',
      'in', 'is', 'lambda', 'nonlocal', 'not', 'or', 'pass', 'raise', 'return', 'try', 'while', 'with',
      'yield'
    ];
    return keywords.includes(word);
  }

  function appendCode() {
    if (currentCharIndex < code.length) {
      const char = code.charAt(currentCharIndex);
      let outputChar = char;

      if (char === '#') {
        outputChar = `<span class="typer-comment">${char}`;
        let i = currentCharIndex + 1;
        while (i < code.length && code.charAt(i) !== '\n') {
          outputChar += code.charAt(i);
          i++;
        }
        outputChar += '</span>';
        currentCharIndex = i;
      } else if (char === '"' || char === "'") {
        outputChar = `<span class="typer-string">${char}`;
        let i = currentCharIndex + 1;
        while (i < code.length && code.charAt(i) !== char) {
          outputChar += code.charAt(i);
          i++;
        }
        if (i < code.length) {
          outputChar += code.charAt(i);
          i++;
        }
        outputChar += '</span>';
        currentCharIndex = i - 1;
      } else if (/[+\-*/%=<>!&|]/.test(char)) {
        outputChar = `<span class="typer-operator">${char}</span>`;
      } else if (/[A-Za-z_]/.test(char)) {
        let i = currentCharIndex + 1;
        while (i < code.length && /[A-Za-z0-9_]/.test(code.charAt(i))) {
          i++;
        }
        const word = code.substring(currentCharIndex, i);
        if (isKeyword(word)) {
          outputChar = `<span class="typer-keyword">${word}</span>`;
        } else {
          outputChar = `<span class="typer-variable">${word}</span>`;
        }
        currentCharIndex = i - 1;
      }

      container.innerHTML += outputChar;
      currentCharIndex++;
      
      const scrollParent = container.closest('.retro-screen') || container.parentElement;
      scrollParent.scrollTop = scrollParent.scrollHeight;
      
      const timer = setTimeout(appendCode, speed);
      container.dataset.typerTimer = timer;
    } else {
      setTimeout(() => {
        currentCharIndex = 0;
        container.innerHTML = '';
        appendCode();
      }, 2000);
    }
  }
  appendCode();
}
window.startCodeTyper = startCodeTyper;

function playRetroCode(btn, code) {
  const screen = btn.closest('.retro-screen');
  const explorer = screen.querySelector('.file-explorer');
  
  const codeContainer = document.createElement('pre');
  codeContainer.className = 'active-media code-typer-container';
  codeContainer.style.cssText = `
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 10px;
    font-family: 'Courier New', monospace;
    font-size: 11px;
    color: #fff;
    white-space: pre-wrap;
    overflow-y: auto;
    background: #000;
    text-align: left;
  `;

  const backBtn = document.createElement('div');
  backBtn.className = 'retro-back-btn';
  backBtn.textContent = '< BACK';
  backBtn.onclick = () => {
    clearTimeout(codeContainer.dataset.typerTimer);
    codeContainer.remove();
    backBtn.remove();
    explorer.style.display = 'block';
  };

  explorer.style.display = 'none';
  screen.appendChild(codeContainer);
  screen.appendChild(backBtn);
  
  startCodeTyper(codeContainer, code);
}
window.playRetroCode = playRetroCode;

// Sidebar active styling & New Layout Styles
const style = document.createElement('style');
style.innerHTML = `
  .typer-keyword { color: #09a3d5; }
  .typer-function { color: #0d00ff; }
  .typer-comment { color: #11c757; }
  .typer-string { color: #d27606; }
  .typer-operator { color: #ff0044; }
  .typer-variable { color: #ffffff; }
  .code-typer-container::-webkit-scrollbar { display: none; }
  
  .file.active, .folder.active {
    background-color: #21262d;
    border-left: 2px solid var(--accent-blue);
  }
  .folder.active {
    border-left: 2px solid var(--accent-orange);
  }
  
  /* Projects Grid */
  .project-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
    margin-top: 25px;
  }
  
  .project-card {
    background: var(--sidebar-bg);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    padding: 20px;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  
  .project-card:hover {
    transform: translateY(-8px);
    border-color: var(--accent-green);
    box-shadow: 0 10px 20px rgba(0,255,0,0.05);
  }
  
  .card-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 12px;
  }
  
  .card-icon { font-size: 24px; }
  .card-title { margin: 0; font-size: 18px; color: var(--accent-green); }
  .card-desc { font-size: 13px; color: var(--text-secondary); margin: 0 0 15px 0; line-height: 1.5; }
  
  .card-tags { display: flex; gap: 8px; }
  .mini-tag { font-size: 10px; background: rgba(88, 166, 255, 0.1); color: var(--accent-blue); padding: 2px 6px; border-radius: 4px; border: 1px solid rgba(88, 166, 255, 0.2); }
  
  /* Research Grid */
  .research-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 15px;
    margin-top: 25px;
  }
  
  .research-card {
    background: rgba(240, 136, 62, 0.03);
    border: 1px solid var(--border-color);
    border-left: 4px solid var(--accent-orange);
    padding: 20px;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s;
    position: relative;
  }
  
  .research-card:hover {
    background: rgba(240, 136, 62, 0.08);
    transform: translateX(5px);
  }
  
  .card-badge {
    position: absolute;
    top: 15px;
    right: 15px;
    font-size: 9px;
    background: var(--accent-orange);
    color: var(--bg-color);
    padding: 2px 8px;
    border-radius: 10px;
    font-weight: bold;
    text-transform: uppercase;
  }
  
  .card-venue { font-size: 12px; font-weight: bold; color: var(--accent-blue); margin: 4px 0; }
  
  /* Tags on Details Page */
  .tags { margin-bottom: 15px; display: flex; gap: 10px; flex-wrap: wrap; }
  .tag { font-size: 11px; border: 1px solid var(--accent-blue); color: var(--accent-blue); padding: 2px 8px; border-radius: 12px; }
  
  /* 1970s Retro Computer Styles */
  .retro-computer {
    position: relative;
    width: 95%;
    max-width: 800px;
    margin: 40px auto;
    perspective: 1200px;
  }
  
  .retro-monitor {
    background: #d2b48c;
    background: linear-gradient(145deg, #e5d3b3, #b89b72);
    border: 4px solid #8b7355;
    border-radius: 40px 40px 10px 10px;
    padding: 30px;
    position: relative;
    box-shadow: 
      0 10px 0 #8b7355,
      0 20px 40px rgba(0,0,0,0.6);
  }
  
  .retro-screen-frame {
    background: #1a1a1a;
    padding: 15px;
    border-radius: 20px;
    box-shadow: inset 0 0 20px #000;
  }

  .retro-screen {
    background: #000;
    position: relative;
    aspect-ratio: 4 / 3;
    overflow: hidden;
    border-radius: 10px;
    border: 2px solid #333;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* CRT Effects */
  .retro-screen::before {
    content: " ";
    display: block;
    position: absolute;
    top: 0; left: 0; bottom: 0; right: 0;
    background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
    z-index: 10;
    background-size: 100% 4px, 6px 100%;
    pointer-events: none;
  }

  .retro-screen::after {
    content: " ";
    display: block;
    position: absolute;
    top: 0; left: 0; bottom: 0; right: 0;
    background: rgba(18, 16, 16, 0.1);
    opacity: 0;
    z-index: 11;
    pointer-events: none;
    animation: flicker 0.15s infinite;
  }

  .file-explorer {
    width: 100%;
    height: 100%;
    padding: 30px;
    font-family: 'Courier New', monospace;
    color: #33ff33;
    display: flex;
    flex-direction: column;
    gap: 10px;
    opacity: 0;
    animation: fadeInMedia 0.5s forwards 3.2s;
    z-index: 4;
    overflow-y: auto;
  }

  .file-item {
    cursor: pointer;
    padding: 5px 10px;
    border: 1px transparent solid;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .file-item:hover {
    background: #33ff33;
    color: #000;
  }

  .active-media {
    width: 100%;
    height: 100%;
    object-fit: contain;
    background: #000;
    position: absolute;
    top: 0; left: 0;
    z-index: 15;
  }

  .retro-back-btn {
    position: absolute;
    top: 10px;
    left: 10px;
    background: #33ff33;
    color: #000;
    padding: 5px 10px;
    font-family: 'Courier New', monospace;
    font-size: 12px;
    cursor: pointer;
    z-index: 20;
    font-weight: bold;
  }

  @keyframes flicker {
    0% { opacity: 0.27; }
    5% { opacity: 0.31; }
    10% { opacity: 0.14; }
    15% { opacity: 0.33; }
    20% { opacity: 0.49; }
    25% { opacity: 0.19; }
    30% { opacity: 0.56; }
    35% { opacity: 0.22; }
    40% { opacity: 0.42; }
    45% { opacity: 0.17; }
    50% { opacity: 0.52; }
    55% { opacity: 0.38; }
    60% { opacity: 0.44; }
    65% { opacity: 0.57; }
    70% { opacity: 0.34; }
    75% { opacity: 0.54; }
    80% { opacity: 0.18; }
    85% { opacity: 0.26; }
    90% { opacity: 0.57; }
    95% { opacity: 0.43; }
    100% { opacity: 0.21; }
  }

  .terminal-loader {
    width: 100%;
    height: 100%;
    padding: 20px;
    font-family: 'Courier New', Courier, monospace;
    color: #33ff33;
    font-size: 14px;
    position: absolute;
    top: 0; left: 0;
    z-index: 5;
    background: #000;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    animation: fadeOut 0.5s forwards 3s;
  }

  .typing-text {
    overflow: hidden;
    white-space: nowrap;
    border-right: 2px solid #33ff33;
    width: 0;
    animation: typing 1.5s steps(30, end) forwards, blink-caret 0.75s step-end infinite;
  }

  @keyframes typing { from { width: 0 } to { width: 100% } }
  @keyframes blink-caret { from, to { border-color: transparent } 50% { border-color: #33ff33 } }
  @keyframes fadeOut { from { opacity: 1; } to { opacity: 0; visibility: hidden; } }
  @keyframes fadeInMedia { from { opacity: 0; } to { opacity: 1; } }

  .retro-base {
    width: 100%;
    height: 60px;
    background: #c2a67e;
    margin-top: -5px;
    border-radius: 0 0 20px 20px;
    box-shadow: inset 0 5px 15px rgba(0,0,0,0.4);
    display: flex;
    justify-content: center;
    gap: 40px;
    padding-top: 10px;
  }

  .vent { width: 100px; height: 10px; background: rgba(0,0,0,0.2); border-radius: 5px; }

  .power-button {
    position: absolute;
    bottom: 20px;
    right: 50px;
    width: 25px;
    height: 25px;
    background: #8b0000;
    border-radius: 50%;
    border: 2px solid #5a0000;
    box-shadow: 0 2px 0 #5a0000;
  }
`;
document.head.appendChild(style);