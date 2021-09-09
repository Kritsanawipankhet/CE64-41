<?php
    /**
     * เปิดใช้งาน Session
     */
    session_start();

    function generateRandomString($length = 256) {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, $charactersLength - 1)];
        }
        return $randomString;
    }
    $client_id = generateRandomString(18);
    $client_secret = bin2hex(random_bytes(12));
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>HOME</title>
    <!-- ติดตั้งการใช้งาน CSS ต่างๆ -->
    <link rel="stylesheet" href="node_modules/bootstrap/dist/css/bootstrap.min.css">
</head>
<body>
    <nav class="navbar navbar-expand-lg fixed-top navbar-light bg-light">
        <div class="container">
            <a class="navbar-brand" href="#">AppzStory Studio</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                   <span class="navbar-toggler-icon"></span>
            </button>
           <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav mr-auto">
                 <li class="nav-item active">
                    <a class="nav-link" href="index.php">HOME <span class="sr-only">(current)</span></a>
                 </li>


                 <li class="nav-item">
                    <a class="nav-link" href="projects.php">Projects <span class="sr-only">(current)</span></a>
                 </li>


                
                </ul>
                <ul class="navbar-nav ml-auto">
                    <!-- ตรวจสอบเงื่อนไขที่ว่า ตัวแปร $_SESSION['id'] ได้ถูกกำหนดขึ้นมาหรือไม่ -->
                    <?php if(isset($_SESSION['id'])) { ?>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                     ยินดีต้อนรับ คุณ <?php echo $_SESSION['first_name']; ?>
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item" href="logout.php">ออกจากระบบ</a>
                        </div>
                    </li>
                    <?php }else { ?>
                    <li class="nav-item">
                        <a class="btn btn-primary" href="login.php">เข้าสู่ระบบ</a>
                        <a class="btn btn-warning" href="register.php">สมัครสมาชิก</a>
                    </li>
                    <?php } ?>
               </ul>
            </div>
        </div>
    </nav>


    <section class="jumbotron">
        <div class="container text-center">
            <h1 class="display-4">Welcome</h1>
            <!-- ตรวจสอบเงื่อนไขที่ว่า ตัวแปร $_SESSION['id'] ได้ถูกกำหนดขึ้นมาหรือไม่ -->
            <?php if ( isset($_SESSION['id']) ){ ?>
            <figure class="figure">
                   <figcaption class="figure-caption"><?php echo $_SESSION['first_name'].' '.$_SESSION['last_name'];?></figcaption>
            </figure>
            <?php } ?>
    </section>


    <?php
        require_once('connect.php'); // ดึงไฟล์เชื่อมต่อ Database เข้ามาใช้งาน
        /**
         * ตรวจสอบเงื่อนไขที่ว่า ตัวแปร $_POST['submit'] ได้ถูกกำหนดขึ้นมาหรือไม่
         */
        if(isset($_POST['submit'])){
                $sql = "INSERT INTO `projects` (`id`, `pname`, `username`,client_id,client_secret) 
                        VALUES (NULL, '".$_POST['pname']."', '".$_POST['username']."', '".$_POST['client_id']."','".$_POST['client_secret']."');";
                $result = $conn->query($sql);
                /**
                 * ตรวจสอบเงื่อนไขที่ว่าการประมวณผลคำสั่งนี่สำเร็จหรือไม่
                 */                
                if($result){
                    echo '<script> alert("สร้างสำเร็จ")</script>';
                    header('Refresh:0; url=projects.php');
                }else{
                    echo 'no';
                }
            }
    ?>

    <div class="container">
        <div class="row">
            <div class="col-md-8 mx-auto mt-5">
                <div class="card">
                    <form action="" method="POST" enctype="multipart/form-data">           
                        <div class="card-header text-center">
                            กรอกข้อมูล
                        </div>
                        <div class="card-body">
                            <div class="form-group row">
                                <label for="pname" class="col-sm-3 col-form-label">ชื่อ</label>
                                <div class="col-sm-9">
                                    <input type="text" class="form-control" id="pname" name="pname" required>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="username" class="col-sm-3 col-form-label">username</label>
                                <div class="col-sm-9">
                                    <input type="text" class="form-control" id="username" name="username" required>
                                </div>    
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-9">
                                    <input type="hidden" class="form-control" id="client_id" name="client_id" value="<?php echo $client_id ?>">
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-9">
                                    <input type="hidden" class="form-control" id="client_secret" name="client_secret" value="<?php echo $client_secret ?>">
                                </div>
                            </div>
                        <div class="card-footer text-center">
                            <input type="submit" name="submit" class="btn btn-success" value="สมัคร">
                        </div>
                    </form>
                    <?php
                     $conn = new mysqli('localhost','root','','basic_php'); 
                     $sql = "SELECT * FROM projects";
                     $result = $conn->query($sql);
                     if ($result->num_rows > 0) {
                        while($row = $result->fetch_assoc()) {
                            $cid = $row["client_id"];
                            $cse = $row["client_secret"];
                            echo "id: " . $row["id"]. " - Name: " . $row["username"]. " - Project: " . $row["pname"]. " - Client_id: ";
                            echo iconv_substr($cid, 0, 5, 'utf-8')."...";
                            echo " - Client_secret: ";
                            echo iconv_substr($cse, 0, 5, 'utf-8')."...";
                            echo "<br>";
                        }
                    } else {
                        echo "0 results";
                    }
                    
                    $conn->close();

                     ?>
                    

                </div>
            </div>
        </div>
    </div>

    <footer class="card bg-secondary text-white text-center p-3">
        <a href=""><img height="36" border="0" alt="เพิ่มเพื่อน" src="https://scdn.line-apps.com/n/line_add_friends/btn/en.png"></a>
        <span> COPYRIGHT © 2018 
            <a class="text-white" href="" target="_blank">AppzStory Studio</a>
            ALL Right Reserved
        </span>
    </footer>


    <!-- ติดตั้งการใช้งาน Javascript ต่างๆ -->
    <script src="node_modules/jquery/dist/jquery.min.js"></script>
    <script src="node_modules/popper.js/dist/umd/popper.min.js"></script>
    <script src="node_modules/bootstrap/dist/js/bootstrap.min.js"></script>
</body>
</html>